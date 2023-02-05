import { useCallback, useEffect, useState } from 'react'

import { DEFAULT_DOMAIN } from './constants'
import { getDomainUrl, setDomainUrl } from './storage'
import './styles.css'

function IndexOptions() {
  const [domain, setDomain] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    getDomainUrl().then((r) => setDomain(r))
  }, [])

  const onSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault()
      setDomainUrl(domain).then(() => setIsSuccess(true))
    },
    [domain]
  )

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
      <form className="container flex max-w-lg flex-col items-center gap-4" onSubmit={onSubmit}>
        <label className="w-full">
          <h2 className="mb-1 text-lg font-bold">Domain</h2>
          <input
            autoFocus
            className="form-input w-full rounded"
            onChange={(e) => {
              setIsSuccess(false)
              setDomain(e.target.value)
            }}
            required
            placeholder={DEFAULT_DOMAIN}
            type="url"
            value={domain}
          />
        </label>
        <button className="rounded-md bg-emerald-500 py-2 px-4 font-bold text-white hover:bg-emerald-600" type="submit">
          Save
        </button>
        {isSuccess && <p className="text-emerald-500">Success!</p>}
      </form>
    </main>
  )
}

export default IndexOptions
