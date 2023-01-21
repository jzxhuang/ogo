import { NextRequest, NextResponse } from 'next/server'

import { getGoLink } from './src/server/edge-config'

export const config = { matcher: '/go/:path+' }

export async function middleware(request: NextRequest) {
  const splitPathname = request.nextUrl.pathname.split('/')
  const linkName = splitPathname[2]

  let isError = false
  try {
    const goLink = await getGoLink(linkName)

    if (goLink) {
      const trailingPathname = splitPathname.slice(3).join('/')
      return NextResponse.redirect(`${goLink.url}/${trailingPathname}${request.nextUrl.search}`)
    }
  } catch (error) {
    console.error('Error reading edge config:', error)
    isError = true
    // swallow error
  }

  // Fallback for error or if go link doesn't exist
  const url = new URL('/go', request.url)
  const searchParams = new URLSearchParams({ source: linkName })
  if (isError) {
    searchParams.set('error', 'true')
  }
  return NextResponse.redirect(`${url.toString()}?${searchParams.toString()}`)
}
