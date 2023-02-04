import { getDomainUrl } from '../storage'

const ID = 1
const PRIORITY = 1

function createRedirectRule(domain: string): chrome.declarativeNetRequest.Rule {
  return {
    id: ID,
    priority: PRIORITY,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      // https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-Redirect
      redirect: { regexSubstitution: `${domain}/go/\\1` },
    },
    condition: {
      // Important to specify matching group for regex substitution
      regexFilter: '^.*://go/(.+)',
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  }
}

/**
 * Sets the redirect rule for the extension, which intercepts requests to go/* and redirects them to the specified domain.
 * @param domain The domain to redirect to. If not specified, the default domain will be used.
 */
export async function setRedirectRule(domain?: string) {
  if (!domain) {
    domain = await getDomainUrl()
  }
  const rule = createRedirectRule(domain)

  // Always remove the existing rule, even if it doesn't exist. Chrome handles the case where it doesn't exist gracefully.
  // However, if we try to add a rule with the same ID, Chrome will throw an error.
  // https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [ID],
  })
}
