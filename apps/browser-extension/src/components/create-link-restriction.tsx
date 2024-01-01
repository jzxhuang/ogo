import { AlertOctagon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getDomainUrl } from '../storage'

export function CreateLinkRestriction() {
  const [webUrl, setWebUrl] = useState('')

  useEffect(() => {
    void getDomainUrl().then(setWebUrl)
  }, [])

  // Show a warning that golinks cannot be created in the publically hosted instance.
  if (process.env.PLASMO_PUBLIC_IS_PUBLIC_DEPLOYMENT === 'true' || webUrl === 'https://ogo.vercel.app') {
    return (
      <div className="grid grid-flow-col gap-2 rounded bg-red-200 p-3">
        <AlertOctagon className="mt-0.5" size={18} />

        <div className="text-left text-sm">
          <p>
            Creating new go links is disabled on the public instance. Self-host ogo to create your own go links!{' '}
            <a
              className="text-blue-500 underline"
              href="https://github.com/jzxhuang/ogo"
              rel="noreferrer"
              target="_blank"
            >
              See the README
            </a>{' '}
            for details.
          </p>
          <br />
          <p>
            In the future, I&apos;d like to add orgs so that you can create your own go links on the public instance —
            contributions are welcome!
          </p>
        </div>
      </div>
    )
  }

  return null
}
