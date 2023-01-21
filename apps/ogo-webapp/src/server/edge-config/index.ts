import { get } from '@vercel/edge-config'

type GoLink = {
  url: string
}

/**
 * Gets a go link from Vercel Edge Config
 * @param linkName the name of the golink
 * @returns The go link if it exists, otherwise undefined
 */
export async function getGoLink(linkName: string): Promise<GoLink | undefined> {
  return get<GoLink>(linkName)
}
