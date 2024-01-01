/**
 * Helper functions for reading and writing to storage
 *
 * @see https://docs.plasmo.com/framework/storage
 */
import { Storage } from '@plasmohq/storage'

import { DEFAULT_WEB_URL, DOMAIN_STORAGE_KEY } from '../constants'

const storage = new Storage()

/**
 * Reads the domain URL from storage
 */
export async function getDomainUrl(): Promise<string> {
  const data = await storage.get(DOMAIN_STORAGE_KEY)
  return data || DEFAULT_WEB_URL
}

/**
 * Saves the domain URL to storage
 */
export async function setDomainUrl(url: string) {
  return storage.set(DOMAIN_STORAGE_KEY, url)
}
