import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'

import { convertQueryParamToString } from '../../src/utils/query-params'

/**
 * Empty SSR function so that `router.query` is defined on the initial render.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}

const NewSuccessPage = memo(function NewSuccessPage() {
  const { query } = useRouter()
  const name = convertQueryParamToString(query.name)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex w-full max-w-2xl flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Created{' '}
            <Link href={`/go/${name}`}>
              {' '}
              <span className="text-purple-500 hover:text-purple-400">go/{name}</span>
            </Link>
            !
          </h1>
        </div>
      </main>
    </>
  )
})

export const config = {
  runtime: 'experimental-edge',
}

export default NewSuccessPage
