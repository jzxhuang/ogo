import { DOMAIN_STORAGE_KEY } from '../constants'
import { setRedirectRule } from '../declarative-net-request/set-redirect-rule'

type OnStorageChanged = Parameters<chrome.storage.StorageChangedEvent['addListener']>[0]

/**
 * Updates the redirect rule when the domain URL in storage is changed
 */
export const onStorageChanged: OnStorageChanged = (changes, areaName) => {
  if (areaName !== 'sync') return

  if (changes[DOMAIN_STORAGE_KEY]) {
    setRedirectRule(changes[DOMAIN_STORAGE_KEY].newValue as string)
  }
}
