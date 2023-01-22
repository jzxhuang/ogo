import { memo } from 'react'

import { api } from '../../utils/api'
import { Combobox } from '../components/combobox/combobox'

export const Homepage = memo(function Homepage() {
  const _go = api.goLink.get.useQuery('gh')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex w-fit flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Open Source <span className="text-purple-500">Go Links</span>
        </h1>

        <Combobox />
      </div>
    </main>
  )
})
