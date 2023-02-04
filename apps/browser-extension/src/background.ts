import { setRedirectRule } from './declarative-net-request/set-redirect-rule'
import { onInstalled } from './event-listeners/on-installed'

// Register event listeners
chrome.runtime.onInstalled.addListener(onInstalled)

// Empty export to keep file a module
export {}
