import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function QueryProvider({ children }: React.PropsWithChildren<object>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
