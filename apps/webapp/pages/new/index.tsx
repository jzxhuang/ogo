import { CreateGoLinkForm } from '@/components/create-go-link/create-go-link-form'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

import { api } from '../../src/utils/api'
import { convertQueryParamToString } from '../../src/utils/query-params'

/**
 * Empty SSR function so that `router.query` is defined on the initial render.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}

const NewIndexPage = memo(function NewIndexPage() {
  const router = useRouter()
  const { query } = router

  const createGoLinkMutation = api.goLink.create.useMutation()
  const createGoLink = useCallback(
    (args: { name: string; url: string; description: string }) => {
      if (createGoLinkMutation.isLoading) return
      createGoLinkMutation.mutate(args, { onSuccess: () => router.push(`/new/success?name=${args.name}`) })
    },
    [createGoLinkMutation, router]
  )

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex w-full max-w-2xl flex-col justify-center gap-2 rounded bg-white px-6 py-7">
          <h1 className="text-2xl font-medium ">Create new go link</h1>

          <CreateGoLinkForm
            description={convertQueryParamToString(query.description)}
            name={convertQueryParamToString(query.name)}
            url={convertQueryParamToString(query.url)}
            onCreateGoLink={createGoLink}
            errorMessage={createGoLinkMutation.error?.message}
          >
            {/* Buttons */}
            <div className="flex gap-3 justify-self-center">
              <button
                disabled={createGoLinkMutation.isLoading}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium  text-white hover:bg-purple-600"
              >
                Create go link
              </button>
            </div>
          </CreateGoLinkForm>
        </div>
      </main>
    </>
  )
})

export const config = {
  runtime: 'experimental-edge',
}

export default NewIndexPage
