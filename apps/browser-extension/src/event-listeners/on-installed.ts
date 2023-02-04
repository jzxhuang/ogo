import { setRedirectRule } from '../declarative-net-request/set-redirect-rule'

/**
 * On install:
 * - Register the dynamic rule for redirecting go/* requests
 * - Open https://go to "teach" Chrome recognize `go/` as a valid hostname
 * - Immediately close the new tab, and re-focus the previous tab
 *
 * Docs: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
 */
export async function onInstalled(details: chrome.runtime.InstalledDetails) {
  // Register the dynamic rule on install
  // Dynamic rule is used so that we can change the redirect domain via extension options
  await setRedirectRule()

  // If this is not a fresh install, short-circuit
  if (details.reason !== chrome.runtime.OnInstalledReason.INSTALL) {
    return
  }

  const createTabProperties: chrome.tabs.CreateProperties = {
    url: 'https://go/__init__',
    active: true,
  }

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

  // Open `https://go/__init__` in a new tab
  const createdTab = await chrome.tabs.create(createTabProperties)
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (tabId !== createdTab.id) return

    // Immediately close the new tab, and re-focus the previous tab
    if (changeInfo.status === 'loading') {
      chrome.tabs.remove(tabId)
      if (tabs.length === 1) {
        const tab = tabs[0]
        if (tab.id) chrome.tabs.update(tab.id, { active: true })
      }
    }
  })
}
