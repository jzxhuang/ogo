import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { getGolink } from '../../edge-config'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const goRouter = createTRPCRouter({
  getLink: publicProcedure.input(z.string()).query(async ({ input }) => {
    const url = await getGolink(input)
    if (!url) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No link was found for the name ${input}.`,
      })
    }

    return { url }
  }),
})
