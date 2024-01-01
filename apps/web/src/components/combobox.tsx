'use client'

import { useRouter } from 'next/navigation'
import { memo, useCallback, useState } from 'react'

export const Combobox = memo(function Combobox() {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      router.push(`/go/${inputValue}`)
    },
    [inputValue, router],
  )

  return (
    <form
      className="flex w-4/5 overflow-hidden rounded-md border border-gray-300 bg-transparent text-2xl text-white
      focus-within:border-sky-300 focus-within:ring-1 focus-within:ring-sky-300"
      onSubmit={onSubmit}
    >
      <label className="flex items-center pl-4" htmlFor="link">
        <span className="py-3">go</span>
        <span className="px-1 font-bold text-sky-300">/</span>
      </label>
      <input
        autoComplete="off"
        autoCorrect="off"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- allow autofocus
        autoFocus
        className="w-full border-none bg-transparent pl-0 text-2xl focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
        id="link"
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        placeholder="link"
        type="text"
        value={inputValue}
      />
    </form>
  )
})
