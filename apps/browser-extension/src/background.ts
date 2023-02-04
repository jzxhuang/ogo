import { onInstalled } from './event-listeners/on-installed'
import { onStorageChanged } from './event-listeners/on-storage-change'

// Register event listeners
chrome.storage.onChanged.addListener(onStorageChanged)
chrome.runtime.onInstalled.addListener(onInstalled)

// Empty export to keep file a module
export {}
