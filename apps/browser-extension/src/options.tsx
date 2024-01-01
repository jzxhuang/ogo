/**
 * This is the extension's options page.
 *
 * @see https://docs.plasmo.com/framework/ext-pages#adding-the-options-page
 */

import { useCallback, useEffect, useState } from 'react'

import { DEFAULT_WEB_URL } from './constants'
import { getDomainUrl, setDomainUrl } from './storage'

import '@repo/ui/global.css'
import './global.css'

import { Input } from '@repo/ui'

function IndexOptions() {
  const [domain, setDomain] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    void getDomainUrl().then((r) => {
      setDomain(r)
    })
  }, [])

  const onSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault()
      void setDomainUrl(domain).then(() => {
        setIsSuccess(true)
      })
    },
    [domain],
  )

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="mb-5 text-2xl font-semibold text-black">Ogo Options</h1>
      <form className="container flex max-w-lg flex-col items-center gap-4" onSubmit={onSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- it is associated with an input */}
        <label className="w-full">
          <h2 className="mb-1 text-lg font-semibold">Domain</h2>
          <Input
            onChange={(e) => {
              setIsSuccess(false)
              setDomain(e.target.value)
            }}
            placeholder={DEFAULT_WEB_URL}
            required
            type="url"
            value={domain}
          />
        </label>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-600" type="submit">
          Save
        </button>
        {isSuccess ? <p className="text-emerald-500">Options saved!</p> : null}
      </form>
    </main>
  )
}

export default IndexOptions
