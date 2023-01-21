import { get } from '@vercel/edge-config'
import { z } from 'zod'

import { edgeConfigLimits } from '../../utils/edge-config-limits'

type PatchEdgeConfigOpts = {
  edgeConfigId: string
  vercelApiToken: string
  vercelTeamId?: string
}

type GoLink = {
  url: string
  description?: string
}

export const upsertGoLinkReqSchema = z.object({
  name: z.string().trim().min(1).regex(edgeConfigLimits.keyRegex).max(edgeConfigLimits.maxKeyLength),
  url: z.string().url().trim(),
  description: z.string().optional(),
})

const EDGE_CONFIG_API_BASE_URL = 'https://api.vercel.com/v1/edge-config'
const getRequestUrl = (opts: PatchEdgeConfigOpts) =>
  `${EDGE_CONFIG_API_BASE_URL}/${opts.edgeConfigId}/items${opts.vercelTeamId ? `?teamId=${opts.vercelTeamId}` : ''}`

/**
 * Gets a go link from Vercel Edge Config
 * @param linkName the name of the golink
 * @returns The go link if it exists, otherwise undefined
 */
export async function getGoLink(linkName: string): Promise<GoLink | undefined> {
  return get<GoLink>(linkName)
}

/**
 * Upserts a go link, writing to Vercel Edge Config
 * Docs: https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-api#update-your-edge-config
 */
export function upsertGoLink(goLink: GoLink & { name: string }, opts: PatchEdgeConfigOpts): Promise<Response> {
  const { name, ...value } = goLink
  const requestUrl = getRequestUrl(opts)

  return fetch(requestUrl, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${opts.vercelApiToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ operation: 'upsert', key: name, value }],
    }),
  })
}
