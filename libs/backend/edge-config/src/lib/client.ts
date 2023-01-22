import { get, getAll } from '@vercel/edge-config'

import { getRequestUrl } from './constants'
import { PatchEdgeConfigItem, PatchEdgeConfigOpts } from './types'

/**
 * Update multiple items in a Vercel Edge Config via the Vercel API
 * Docs: https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-api#update-your-edge-config
 */
export function patch(items: PatchEdgeConfigItem[], opts: PatchEdgeConfigOpts): Promise<Response> {
  const requestUrl = getRequestUrl(opts)

  return fetch(requestUrl, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${opts.vercelApiToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
}

export { get, getAll }

export const edgeConfigClient = {
  /**
   * Fetches the value for a single key from Vercel Edge Config
   * Expects `process.env.EDGE_CONFIG` to be set, as required by `@vercel/edge-config`
   *
   * Returns the value of type T if it exists, otherwise undefined
   */
  get,
  getAll,
  patch,
}
