import { memo } from 'react'

import { api } from '../../utils/api'
import { Combobox } from '../components/combobox/combobox'
import { CreateGoLinkModal } from '../components/create-go-link/create-go-link-modal'
import { SearchResults } from '../components/search-results/search-results'
import { useBoolean } from '../hooks/use-boolean'

type GoLinkNotFoundProps = {
  linkName: string
}

export const GoLinkNotFound = memo(function GoLinkNotFound(props: GoLinkNotFoundProps) {
  const { linkName } = props
  const searchQuery = api.goLink.search.useQuery(linkName)

  const [isCreating, setIsCreating] = useBoolean(false)

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex w-full max-w-2xl flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Oops! <span className="text-purple-500">go/{linkName}</span> not found
          </h1>

          {searchQuery.data && (
            <div className="flex w-full flex-col gap-3">
              <h2 className=" text-center text-lg text-white">Did you mean:</h2>
              <SearchResults results={searchQuery.data.results} />
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-5">
            <button
              className="rounded-md bg-emerald-500 py-2 px-4 font-bold text-white hover:bg-emerald-600"
              onClick={setIsCreating.setTrue}
            >
              Create go/{linkName}
            </button>
            <h3 className="text-white">or</h3>
            <Combobox />
          </div>
        </div>
      </main>

      <CreateGoLinkModal isOpen={isCreating} onClose={setIsCreating.setFalse} name={linkName} />
    </>
  )
})
