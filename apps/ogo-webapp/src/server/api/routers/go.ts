import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { getGoLink } from '../../edge-config'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const goRouter = createTRPCRouter({
  getLink: publicProcedure.input(z.string()).query(async ({ input }) => {
    const goLink = await getGoLink(input)
    if (!goLink) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No go link was found for: ${input}.`,
      })
    }

    return { goLink }
  }),
})
