/**
 * Converts query param to string. If the param is a list, returns the first match
 */
export const convertQueryParamToString = (param?: string | string[], defaultValue = '') => {
  if (typeof param === 'string') {
    return param
  }

  return param?.[0] || defaultValue
}
