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
        <title>Welcome to ogo-webapp!</title>
      </Head>
      <main className="app">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  )
}

export default api.withTRPC(MyApp)
