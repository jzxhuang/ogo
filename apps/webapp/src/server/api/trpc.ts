/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { TRPCError, initTRPC } from '@trpc/server'
import { type Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import superjson from 'superjson'

type CreateContextOptions = {
  session: Session | null
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
  }
}

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint.
 * Use this with serverless runtime
 * @link https://trpc.io/docs/context
 */
// export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//   const { req, res } = opts

//   // Get the session from the server using the unstable_getServerSession wrapper function
//   const session = await getServerAuthSession({ req, res })

//   return createInnerTRPCContext({
//     session,
//   })
// }

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint.
 * Compatible with edge runtime
 * @link https://trpc.io/docs/context
 */
export const createTRPCContextEdge = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let parsedToken: JWT | null = null

  // We cast `args.req` as `NextRequestWithAuth` to satisfy the type checker
  // Really, it's `NextRequest` type
  await withAuth(req as NextRequestWithAuth, {
    callbacks: {
      authorized: ({ token }) => {
        // console.log('XXX token:', token)
        if (token) {
          parsedToken = token
        }
        return true
      },
    },
  })

  // TODO: implement this
  // let session = null
  // if (parsedToken) {
  //   session = {

  return createInnerTRPCContext({
    session: null,
  })
}

const t = initTRPC.context<typeof createTRPCContextEdge>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)