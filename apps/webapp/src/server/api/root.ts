import { exampleRouter } from './routers/example'
import { goLinkRouter } from './routers/go-link'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  goLink: goLinkRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
