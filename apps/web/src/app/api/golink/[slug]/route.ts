import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Get a go link by slug, if it exists.
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know these are defined
    process.env.SUPABASE_URL!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, turbo/no-undeclared-env-vars -- we know these are defined
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore, too strict
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore, too strict
          cookieStore.set({ name, value: '', ...options })
        },
      },
    },
  )

  const res = await supabase.from('golinks').select('*').eq('slug', params.slug).single()

  if (res.error) {
    return Response.json(res.error, { status: 404 })
  }

  return Response.json(res.data)
}
