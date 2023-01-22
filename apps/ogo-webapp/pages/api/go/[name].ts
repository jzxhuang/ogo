import { TRPCError } from '@trpc/server'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'
import { NextRequest, NextResponse } from 'next/server'

import { appRouter } from '../../../src/server/api/root'
import { createTRPCContextEdge } from '../../../src/server/api/trpc'

export const config = {
  runtime: 'edge',
}

/**
 * Get a go link by name.
 * Docs: https://create.t3.gg/en/usage/trpc#expose-a-single-procedure-externally
 */
const getGolinkByNameHandler = async (req: NextRequest) => {
  // Create context and caller
  const ctx = await createTRPCContextEdge(req)
  const caller = appRouter.createCaller(ctx)

  const name = req.nextUrl.pathname.split('/').pop() as string

  try {
    const goLink = await caller.goLink.get(name)
    return new NextResponse(JSON.stringify(goLink), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occurred
      const httpCode = getHTTPStatusCodeFromError(cause)
      return new NextResponse(JSON.stringify(cause), {
        status: httpCode,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Another error occurred
    console.error(cause)
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  // Serverless runtime equivalent
  // try {
  //   const { name } = req.
  //   const url = await caller.go.getLink(name as string)
  //   res.status(200).json(url)
  // } catch (cause) {
  //   if (cause instanceof TRPCError) {
  //     // An error from tRPC occurred
  //     const httpCode = getHTTPStatusCodeFromError(cause)
  //     return res.status(httpCode).json(cause)
  //   }
  //   // Another error occurred
  //   console.error(cause)
  //   res.status(500).json({ message: 'Internal server error' })
  // }
}

export default getGolinkByNameHandler
