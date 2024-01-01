import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './auth-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: React.PropsWithChildren<object>) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster position="bottom-center" />
    </AuthProvider>
  )
}
