import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { z } from 'zod'

const createSupabaseClient = () => {
  const cookieStore = cookies()
  const supabase = createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, turbo/no-undeclared-env-vars -- we know these are defined
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
  return supabase
}

const newGoLinkSchema = z.object({
  destination: z.string().url(),
  description: z.string().max(1000).optional(),
})

/**
 * Get a go link by slug, if it exists.
 */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()

  const res = await supabase.from('golinks').select('*').eq('slug', params.slug).single()

  if (res.error) {
    return Response.json(res.error, { status: 404 })
  }

  return Response.json(res.data)
}

/**
 * Create a new go link. Fails if a golink already exists with the same slug.
 */
export async function POST(req: Request, { params: { slug } }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()

  const parsed = newGoLinkSchema.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json(parsed.error, { status: 400 })
  }

  const res = await supabase.from('golinks').insert({ slug, ...parsed.data })
  if (res.error) {
    return Response.json(res.error, { status: res.status })
  }

  return Response.json(res.data, { status: res.status })
}
