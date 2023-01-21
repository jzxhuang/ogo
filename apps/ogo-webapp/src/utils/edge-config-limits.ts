// https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-limits
export const MAX_LENGTH = 256
export const REGEX_PATTERN = '^[A-z0-9_-]+$'
export const REGEX = new RegExp(REGEX_PATTERN)

export const edgeConfigLimits = {
  maxKeyLength: MAX_LENGTH,
  keyRegexPattern: REGEX_PATTERN,
  keyRegex: REGEX,
} as const
