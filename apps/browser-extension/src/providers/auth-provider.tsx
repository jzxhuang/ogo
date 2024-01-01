import { sendToBackground } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'
import type { Session } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { supabase } from '../supabase/supabase-client'

/**
 * A stub function that throws an error if called. Useful when defining the initial state of a React context
 */
export const createContextStub = (contextName: string) => (): never => {
  throw new Error(`You forgot to wrap your component in <${contextName}>`)
}
const stub = createContextStub('AuthContext')

export type AuthContextT = {
  isLoadingAuth: boolean
  session: Session | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextT>({
  isLoadingAuth: true,
  session: null,
  signOut: stub,
})

/**
 * Provides auth state. The user is stored in local storage using `@plasmohq/storage`
 */
export function AuthProvider({ children }: React.PropsWithChildren<object>) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const [session, setSession] = useStorage<Session | null>({
    key: 'session',
    instance: new Storage({
      area: 'local',
    }),
  })

  /**
   * Initialize the auth session.
   */
  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession()

      setIsLoadingAuth(false)
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      if (data.session) {
        void setSession(data.session)
        void sendToBackground({
          name: 'init-session',
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token,
          },
        })
      }

      return subscription.unsubscribe
    }

    void init()
  }, [setSession])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    void setSession(null)
  }, [setSession])

  return <AuthContext.Provider value={{ isLoadingAuth, session, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
