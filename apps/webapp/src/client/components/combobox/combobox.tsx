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
      className="flex w-full overflow-hidden rounded-md border border-gray-300 bg-transparent text-2xl text-white
      focus-within:border-white focus-within:outline-2 focus-within:outline-transparent focus-within:ring-0 focus-within:ring-white focus-within:ring-opacity-50"
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
        className="w-full border-none bg-transparent pl-0 text-2xl focus:shadow-none focus:outline-none focus:ring-0"
        placeholder="link"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  )
})
