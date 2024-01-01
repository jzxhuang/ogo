/**
 * Background SW entry point
 *
 * @see https://docs.plasmo.com/framework/background-service-worker
 */

import { onInstalled } from './event-listeners/on-installed'
import { onStorageChanged } from './event-listeners/on-storage-change'

chrome.storage.onChanged.addListener(onStorageChanged)
chrome.runtime.onInstalled.addListener(onInstalled)

// Empty export to keep file a module
export {}
