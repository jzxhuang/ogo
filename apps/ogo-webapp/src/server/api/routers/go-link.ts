import { PatchEdgeConfigOpts, patch } from '@/backend/edge-config'
import { edgeConfigLimits } from '@/constants'
import { GoLink } from '@/types'
import { TRPCError } from '@trpc/server'
import { get } from '@vercel/edge-config'
import { z } from 'zod'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, publicProcedure } from '../trpc'

const patchEdgeConfigOpts: PatchEdgeConfigOpts = {
  edgeConfigId: env.EDGE_CONFIG_ID,
  vercelApiToken: env.VERCEL_API_TOKEN,
  vercelTeamId: env.VERCEL_TEAM_ID,
}

const upsertGoLinkReqSchema = z.object({
  name: z.string().trim().min(1).regex(edgeConfigLimits.keyRegex).max(edgeConfigLimits.maxKeyLength),
  url: z.string().url().trim(),
  description: z.string().optional(),
})

export const goLinkRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    const goLink = await get<GoLink>(input)
    if (!goLink) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No go link was found for: ${input}.`,
      })
    }

    return { goLink }
  }),

  upsert: publicProcedure.input(upsertGoLinkReqSchema).mutation(({ input }) => {
    const { name, ...value } = input
    return patch(
      [
        {
          operation: 'upsert',
          key: name,
          value,
        },
      ],
      patchEdgeConfigOpts
    )
  }),
})
