import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { GoLinkNotFound } from '../../src/client/views/go-link-not-found'
import { convertQueryParamToString } from '../../src/utils/query-params'

export const config = {
  runtime: 'experimental-edge',
}

/**
 * Empty SSR function so that `router.query` is defined on the initial render.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}

/**
 * This page will only be reached if the requested go link does not exist.
 * Valid go links are intercepted by the middleware, and redirected to.
 *
 * We use SSR on this page to get the dynamic route segment on the initial render.
 */
function GoLinkNotFoundPage() {
  const {
    query: { name },
  } = useRouter()
  return <GoLinkNotFound linkName={convertQueryParamToString(name)} />
}

export default GoLinkNotFoundPage
