import { BROWSER_EXTENSION_QUERY_PARAM } from '@/constants'
import { GoLink, newGoLinkSchema } from '@/types'
import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

import { appRouter } from './src/server/api/root'
import { createTRPCContextEdge } from './src/server/api/trpc'

export const config = { matcher: ['/go/:path+', '/new'] }

export async function middleware(request: NextRequest) {
  if (request.method !== 'GET') return NextResponse.next()

  // For requests to /go/:path, try to find a go link and redirect to it
  if (request.nextUrl.pathname.startsWith('/go')) {
    return handleGoLink(request)
  }

  // For requests to /new from the browser extension, immediately try to create a new go link
  if (request.nextUrl.pathname.startsWith('/new')) {
    return createGoLink(request)
  }

  return NextResponse.next()
}

/**
 * Tries to redirect to a go link based on the request path.
 * If no go link is found, continues to the next middleware (render `/go/[...go-link-name]`) page
 */
const handleGoLink = async (request: NextRequest) => {
  const splitPathname = request.nextUrl.pathname.split('/')
  const linkName = splitPathname[2]

  let isError = false
  try {
    const goLink = await get<GoLink>(linkName)

    if (goLink) {
      const trailingPathname = splitPathname.slice(3).join('/')
      const searchParams = request.nextUrl.searchParams
      // Need to delete this query parameter, otherwise it gets injected by Next.js
      // when using router.push(`/go/${linkName}`), since the we have a dynamic route
      // at /go/[...go-link-name].
      searchParams.delete('go-link-name')

      const search = searchParams.toString()
      return NextResponse.redirect(`${goLink.url}/${trailingPathname}${search ? `?${search}` : ''}`)
    }
  } catch (error) {
    console.error('Error reading edge config:', error)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError = true
    throw error
    // TODO: if something goes wrong, we should show a nice error page
  }

  // Fallback for error or if go link doesn't exist
  return NextResponse.next()
}

/**
 * Attempts to create a new go link by parsing query parameters.
 * Redirects to `/new/success` if successful, or `/new/error` if not.
 */
const createGoLink = async (request: NextRequest) => {
  if (request.nextUrl.searchParams.get(BROWSER_EXTENSION_QUERY_PARAM) !== 'true') return NextResponse.next()

  const params = {
    url: request.nextUrl.searchParams.get('url'),
    name: request.nextUrl.searchParams.get('name'),
    description: request.nextUrl.searchParams.get('description'),
  }

  const parsed = newGoLinkSchema.safeParse(params)
  if (!parsed.success) return NextResponse.next()

  // Create context and caller
  const ctx = await createTRPCContextEdge(request)
  const caller = appRouter.createCaller(ctx)

  // If go link already exists, do not allow creating a new one
  const goLink = await get<GoLink>(parsed.data.name)
  if (goLink) {
    const params = new URLSearchParams(request.nextUrl.searchParams)
    params.set('alreadyExists', 'true')
    return NextResponse.redirect(new URL(`/new/error?${params.toString()}`, request.url))
  }

  try {
    await caller.goLink.create(parsed.data)
    return NextResponse.redirect(new URL(`/new/success${request.nextUrl.search}`, request.url))
  } catch (error) {
    console.error('Error creating go link:', error)
    return NextResponse.redirect(new URL(`/new/error${request.nextUrl.search}`, request.url))
  }
}
