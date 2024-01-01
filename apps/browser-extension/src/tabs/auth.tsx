/**
 * @see https://docs.plasmo.com/framework/tab-pages
 */

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Button } from '@repo/ui'

import { AuthProvider, useAuth } from '../components/auth-provider'
import { supabase } from '../supabase/supabase-client'

import '@repo/ui/global.css'
import '../global.css'

function AuthPageContents() {
  const { isLoadingAuth, user, signOut } = useAuth()

  if (isLoadingAuth) {
    return null
  }

  if (user) {
    return (
      <div className="grid justify-center gap-4">
        <h2 className="text-3xl font-semibold">Logged in!</h2>
        <Button
          onClick={() => {
            void signOut()
          }}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return <Auth appearance={{ theme: ThemeSupa }} providers={[]} supabaseClient={supabase} />
}

function AuthPage() {
  return (
    <AuthProvider>
      <div className="mx-auto grid h-full min-h-screen w-full grid-cols-[minmax(0,850px)] items-center justify-center px-5">
        <AuthPageContents />
      </div>
    </AuthProvider>
  )
}

export default AuthPage
