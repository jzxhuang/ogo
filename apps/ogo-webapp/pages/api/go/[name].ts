import { TRPCError } from '@trpc/server'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'
import type { NextApiRequest, NextApiResponse } from 'next'

import { appRouter } from '../../../src/server/api/root'
import { createTRPCContext } from '../../../src/server/api/trpc'

/**
 * Get a golink by name.
 * Docs: https://create.t3.gg/en/usage/trpc#expose-a-single-procedure-externally
 */
const getGolinkByNameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res })
  const caller = appRouter.createCaller(ctx)
  try {
    const { name } = req.query
    const url = await caller.go.getLink(name as string)
    console.log('XXX url:', url)
    res.status(200).json(url)
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occurred
      const httpCode = getHTTPStatusCodeFromError(cause)
      return res.status(httpCode).json(cause)
    }
    // Another error occurred
    console.error(cause)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default getGolinkByNameHandler
