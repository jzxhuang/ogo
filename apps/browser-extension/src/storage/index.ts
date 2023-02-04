import { DEFAULT_DOMAIN, DOMAIN_STORAGE_KEY } from '../constants'

/**
 * Reads the domain URL from storage.sync
 */
export async function getDomainUrl(): Promise<string> {
  const result = await chrome.storage.sync.get(DOMAIN_STORAGE_KEY)
  return (result.domain as string) ?? DEFAULT_DOMAIN
}

/**
 * Saves the domain URL to storage.sync
 */
export async function setDomainUrl(url: string) {
  return chrome.storage.sync.set({ [DOMAIN_STORAGE_KEY]: url })
}
