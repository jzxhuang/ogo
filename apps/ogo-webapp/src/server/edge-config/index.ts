import { get } from '@vercel/edge-config'

/**
 * Gets a golink from Vercel Edge Config
 * @param linkName the name of the golink
 * @returns the URL of the golink if it exists, otherwise undefined
 */
export async function getGolink(linkName: string): Promise<string | undefined> {
  return get<string>(linkName)
}
