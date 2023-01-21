import { useRouter } from 'next/router'
import { memo, useCallback, useState } from 'react'

export const Combobox = memo(function Combobox() {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      router.push(`/go/${inputValue}`)
    },
    [inputValue, router]
  )

  return (
    <form
      className="flex w-4/5 overflow-hidden rounded-md border border-white bg-transparent text-2xl text-white md:w-[32rem]"
      onSubmit={onSubmit}
    >
      <label htmlFor="link" className="flex py-3 pl-4">
        go <span className="px-1 font-bold text-purple-500">/</span>
      </label>
      <input
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        id="link"
        type="text"
        className="w-full bg-transparent focus:border-transparent focus:outline-none"
        placeholder="link"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  )
})
