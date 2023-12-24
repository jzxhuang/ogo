import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import '@repo/ui/styles.css'
import './globals.css'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Open-source Go Links — ogo',
  description: 'Free, open-source go links built on Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
