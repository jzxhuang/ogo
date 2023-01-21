import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { env } from '../../../env/server.mjs'
import { getGoLink, upsertGoLink, upsertGoLinkReqSchema } from '../../edge-config'
import { createTRPCRouter, publicProcedure } from '../trpc'

const patchEdgeConfigOpts = {
  edgeConfigId: env.EDGE_CONFIG_ID,
  vercelApiToken: env.VERCEL_API_TOKEN,
  vercelTeamId: env.VERCEL_TEAM_ID,
}

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

  upsertGolink: publicProcedure.input(upsertGoLinkReqSchema).mutation(({ input }) => {
    return upsertGoLink(input, patchEdgeConfigOpts)
  }),
})
