'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" disableTransitionOnChange forcedTheme="dark" {...props}>
      {children}
    </NextThemesProvider>
  )
}
