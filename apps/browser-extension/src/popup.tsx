import { useCallback, useEffect, useState } from 'react'

import { getDomainUrl } from './storage'
import './styles.css'

function IndexPopup() {
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      if (tab.url) setUrl(tab.url)
      if (tab.title) setDescription(tab.title)
    })
  }, [])

  const onSubmit = useCallback<React.FormEventHandler>(
    async (e) => {
      e.preventDefault()
      const domain = await getDomainUrl()
      const params = new URLSearchParams({ ogoBrowserExtension: 'true', name, url, description })
      chrome.tabs.create({ url: `${domain}/new?${params.toString()}` })
    },
    [description, name, url]
  )

  return (
    <div className="grid min-w-[32rem] rounded bg-white p-4 ">
      <h2 className="text-2xl font-medium text-black">Create new go link</h2>

      {/* Plasmo is unable to import from Nx monorepo properly... so just redefine this */}
      <form className="grid grid-flow-row gap-5 pt-6" onSubmit={onSubmit}>
        <label className="flex flex-col gap-1">
          <h3 className="font-medium text-gray-800">
            Destination URL<span className="text-red-600">*</span>
          </h3>
          <input
            className="w-full rounded-md border-gray-300 p-3 text-sm text-gray-600"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://google.com"
            required
            type="url"
            value={url}
          />
        </label>

        <label className="flex flex-col gap-1">
          <h3 className="font-medium text-gray-800">
            Link Name<span className="text-red-600">*</span>
          </h3>
          <div className="flex w-full items-center overflow-hidden rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none">
            <div className="h-full bg-gray-200 py-3 px-3">go/</div>
            <input
              autoFocus
              className="w-full rounded-md rounded-l-none border-gray-300 p-3 text-sm text-gray-600"
              maxLength={256}
              onChange={(e) => setName(e.target.value)}
              pattern={'^[A-z0-9_-]+$'}
              placeholder="link"
              required
              title="Only alphanumeric characters, - and _ are allowed."
              type="text"
              value={name}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <h3 className="font-medium text-gray-800">Description</h3>
          <textarea
            className="w-full rounded-md border-gray-300 p-3 text-sm text-gray-600"
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Enter a description..."
            value={description}
          ></textarea>
        </label>

        {/* Buttons */}
        <div className="flex gap-3 justify-self-center">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium  text-white hover:bg-purple-600"
          >
            Create go link
          </button>
        </div>
      </form>

      <button
        className="mt-3 justify-self-start text-blue-500 underline"
        onClick={() => chrome.runtime.openOptionsPage()}
      >
        Options
      </button>
    </div>
  )
}

export default IndexPopup
