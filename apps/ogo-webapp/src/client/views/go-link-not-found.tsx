import { memo } from 'react'

import { api } from '../../utils/api'
import { Combobox } from '../components/combobox/combobox'

type GoLinkNotFoundProps = {
  linkName: string
}

export const GoLinkNotFound = memo(function GoLinkNotFound(props: GoLinkNotFoundProps) {
  const { linkName } = props
  const _go = api.go.getLink.useQuery('gh')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex w-fit flex-col items-center justify-center gap-10 px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          <span className="text-purple-500">go/{linkName}</span> not found
        </h1>

        <Combobox />
      </div>
    </main>
  )
})
