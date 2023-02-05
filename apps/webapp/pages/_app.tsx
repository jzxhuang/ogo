import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import Head from 'next/head'

import { api } from '../src/utils/api'
import './styles.css'

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <title>Open Source Go Links — ogo</title>
        <meta
          name="description"
          content="Free, easy-to-setup go links built on Vercel Edge Config — no database required."
        />
      </Head>
      <ReactQueryDevtools position="bottom-right" />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
