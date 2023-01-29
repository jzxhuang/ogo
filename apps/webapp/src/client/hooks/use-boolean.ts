/** Adapted from https://github.com/chakra-ui/chakra-ui/blob/next/packages/hooks/src/use-boolean.ts */
import { useMemo, useState } from 'react'

type InitialState = boolean | (() => boolean)

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBoolean(initialState: InitialState) {
  const [value, setValue] = useState(initialState)
  const callbacks = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    []
  )
  return [value, callbacks] as const
}
