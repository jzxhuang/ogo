import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import superjson from 'superjson'

import { GoLinkNotFound } from '../../src/client/views/go-link-not-found'
import { appRouter } from '../../src/server/api/root'
import { convertQueryParamToString } from '../../src/utils/query-params'

const PATH_NAME_PARAM = 'go-link-name'

export const config = {
  runtime: 'experimental-edge',
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = convertQueryParamToString(context.query[PATH_NAME_PARAM])
  const ssr = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson, // optional - adds superjson serialization
    queryClientConfig: { defaultOptions: { queries: { retry: 1 } } },
  })

  await ssr.goLink.search.prefetch(name)

  return { props: { trpcState: ssr.dehydrate() } }
}

/**
 * This page will only be reached if the requested go link does not exist.
 * Valid go links are intercepted by the middleware, and redirected to.
 *
 * We use SSR on this page to get the dynamic route segment on the initial render.
 */
function GoLinkNotFoundPage() {
  const { query } = useRouter()
  return <GoLinkNotFound linkName={convertQueryParamToString(query[PATH_NAME_PARAM])} />
}

export default GoLinkNotFoundPage
