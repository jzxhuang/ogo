import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Checks if a golink exists and redirects to the destination if it does.
 * Additional route segments are appended to the destination URL.
 * For example, if the golink for `go/yt` is `https://youtube.com`, then
 * `go/yt/feed/history` will redirect to `https://youtube.com/feed/history`.
 *
 * If the golink does not exist, display a page with some info such as:
 * - CTA to create the golink
 * - show related links
 */
export default async function GolinkPage({ params }: { params: { slug: string[] } }) {
  const linkFromSlug = params.slug[0]
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
      },
    },
  )

  const res = await supabase.from('golinks').select('*').eq('slug', linkFromSlug).single()

  if (!res.error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
    let destinationUrl = res.data.destination as string
    if (params.slug.slice(1).length > 0) {
      destinationUrl = `${destinationUrl}/${params.slug.slice(1).join('/')}`
    }

    return redirect(destinationUrl)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex max-w-4xl flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          <span className="text-purple-500">go/{params.slug.join('/')}</span> not found
        </h1>
      </div>
    </main>
  )
}
