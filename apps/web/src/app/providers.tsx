'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'
import { Provider } from 'react-wrap-balancer'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" disableTransitionOnChange forcedTheme="dark" {...props}>
      <Provider>{children}</Provider>
    </NextThemesProvider>
  )
}
