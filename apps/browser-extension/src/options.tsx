import { useCallback, useEffect, useState } from 'react'

import { getDomainUrl, setDomainUrl } from './storage'

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
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        gap: 16,
      }}
    >
      <h1>Options</h1>
      <label>
        <h3>Domain URL</h3>
        <input
          onChange={(e) => {
            setIsSuccess(false)
            setDomain(e.target.value)
          }}
          required
          placeholder="https://ogo.vercel.app"
          type="url"
          value={domain}
        />
      </label>
      <button type="submit">Save</button>
      {isSuccess && <p>Success!</p>}
    </form>
  )
}

export default IndexOptions
