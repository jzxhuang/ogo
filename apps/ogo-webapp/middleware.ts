import { GoLink } from '@/types'
import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

export const config = { matcher: '/go/:path+' }

export async function middleware(request: NextRequest) {
  const splitPathname = request.nextUrl.pathname.split('/')
  const linkName = splitPathname[2]

  let isError = false
  try {
    const goLink = await get<GoLink>(linkName)

    if (goLink) {
      const trailingPathname = splitPathname.slice(3).join('/')
      return NextResponse.redirect(`${goLink.url}/${trailingPathname}${request.nextUrl.search}`)
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
