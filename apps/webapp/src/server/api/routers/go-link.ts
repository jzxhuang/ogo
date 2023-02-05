import { PatchEdgeConfigOpts, patch } from '@/backend/edge-config'
import { GoLink, goLinkNameSchema, newGoLinkSchema } from '@/types'
import { TRPCError } from '@trpc/server'
import { get, getAll } from '@vercel/edge-config'
import fuzzysort from 'fuzzysort'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, publicProcedure } from '../trpc'

const patchEdgeConfigOpts: PatchEdgeConfigOpts = {
  edgeConfigId: env.EDGE_CONFIG_ID,
  vercelApiToken: env.VERCEL_API_TOKEN,
  vercelTeamId: env.VERCEL_TEAM_ID,
}

type SearchMatch =
  | (Pick<Fuzzysort.Result, 'score' | 'target'> & { highlighted: string | null; indexes: number[] })
  | null

type SearchResult = {
  score: number
  goLink: GoLink & { key: string }
  matches: { key: SearchMatch; url: SearchMatch; description: SearchMatch }
}

const createSearchMatch = (result: Fuzzysort.Result | null): SearchMatch => {
  if (!result) return null
  return {
    score: result.score,
    target: result.target,
    highlighted: fuzzysort.highlight(result, '<b>', '</b>'),
    // @ts-expect-error pass through hidden type
    indexes: result._indexes,
  }
}

export const goLinkRouter = createTRPCRouter({
  get: publicProcedure.input(goLinkNameSchema).query(async ({ input }) => {
    const goLink = await get<GoLink>(input)
    if (!goLink) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No go link was found for: ${input}.`,
      })
    }

    return { goLink }
  }),

  create: publicProcedure.input(newGoLinkSchema).mutation(async ({ input }) => {
    const { name, ...value } = input

    const goLink = await get<GoLink>(name)
    if (goLink) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Go link already exists for: go/${name}.`,
      })
    }

    const now = Date.now()
    return patch(
      [
        {
          operation: 'create',
          key: name,
          value: { ...value, createdAt: now },
        },
      ],
      patchEdgeConfigOpts
    )
  }),

  search: publicProcedure.input(goLinkNameSchema).query(async ({ input }) => {
    const allItems = await getAll<Record<string, GoLink>>()
    if (!allItems) {
      return { total: 0, results: [] }
    }
    const itemsToSearch = Object.entries(allItems).map(([key, value]) => ({ ...value, key }))
    // console.log('XXX itemsToSearch:', itemsToSearch)
    // console.log('XXX allItems:', allItems)

    const searchResults = fuzzysort.go(input, itemsToSearch, {
      keys: ['key', 'url', 'description'],
      limit: 100,
      // threshold: -1000,
      // scoreFn: (a) => {
      //   console.log('XXX a:', a)
      //   if (a[0]) {
      //     const foo = a[0]
      //     console.log('XXX foo:', foo)
      //     // foo.target
      //   }
      //   return a[0]?.score ?? -1000
      // },
      // scoreFn: (a) => Math.max(a[0] ? a[0].score : -1000, a[1] ? a[1].score - 100 : -1000),
    })
    // return { goLinks }
    // console.log('XXX searchResults:', searchResults)

    if (!searchResults.total) return { total: 0, results: [] }

    const results = searchResults.map((result) => {
      const { obj, score } = result

      // const key = result[0]
      // const url = result[1]
      // const description = result[2]

      const matches = {
        key: createSearchMatch(result[0]),
        url: createSearchMatch(result[1]),
        description: createSearchMatch(result[2]),
      }

      return { score, matches, goLink: obj } as SearchResult
    })

    return { total: searchResults.total, results }
  }),
})
