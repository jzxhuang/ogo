import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

export const config = { matcher: '/go/:path+' }

export async function middleware(request: NextRequest) {
  const splitPathname = request.nextUrl.pathname.split('/')
  const linkName = splitPathname[2]
  const trailingPathname = splitPathname.slice(3).join('/')

  const linkUrl = await get<string>(linkName)

  if (linkUrl) {
    return NextResponse.redirect(`${linkUrl}/${trailingPathname}${request.nextUrl.search}`)
  } else {
    const url = new URL('/go', request.url)
    const searchParams = new URLSearchParams({ source: linkName })
    return NextResponse.redirect(`${url.toString()}?${searchParams.toString()}`)
  }
}
