import { DOMAIN_STORAGE_KEY } from '../constants'
import { setRedirectRule } from '../declarative-net-request'

type OnStorageChanged = Parameters<chrome.storage.StorageChangedEvent['addListener']>[0]

/**
 * Updates the redirect rule when the domain URL in storage is changed
 */
export const onStorageChanged: OnStorageChanged = (changes, areaName) => {
  if (areaName !== 'sync') return

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- incorrect type
  if (changes[DOMAIN_STORAGE_KEY]) {
    void setRedirectRule(changes[DOMAIN_STORAGE_KEY].newValue as string)
  }
}
