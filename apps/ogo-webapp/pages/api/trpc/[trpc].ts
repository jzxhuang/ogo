import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest } from 'next/server.js'

import { env } from '../../../src/env/server.mjs'
import { appRouter } from '../../../src/server/api/root'
import { createTRPCContextEdge } from '../../../src/server/api/trpc'

// API handler (serverless runtime)
// export default createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
//   onError:
//     env.NODE_ENV === 'development'
//       ? ({ path, error }) => {
//           console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
//         }
//       : undefined,
// })

// export API handler (edge runtime)
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: (args) => createTRPCContextEdge(args.req as NextRequest),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined,
  })
}

// We're using the edge runtime
export const config = {
  runtime: 'edge',
}
