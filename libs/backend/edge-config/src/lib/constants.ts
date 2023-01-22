import { PatchEdgeConfigOpts } from './types'

const EDGE_CONFIG_API_BASE_URL = 'https://api.vercel.com/v1/edge-config'

export const getRequestUrl = (opts: PatchEdgeConfigOpts) =>
  `${EDGE_CONFIG_API_BASE_URL}/${opts.edgeConfigId}/items${opts.vercelTeamId ? `?teamId=${opts.vercelTeamId}` : ''}`
