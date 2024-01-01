/**
 * This is the main popup component that is rendered when the user clicks on the extension icon.
 *
 * @see https://docs.plasmo.com/framework/ext-pages
 */

import { Settings as SettingsIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import '@repo/ui/global.css'
import './global.css'

import { Button, Input } from '@repo/ui'

import { AuthProvider } from './components/auth-provider'
import { CreateLinkRestriction } from './components/create-link-restriction'
import { ProfileDropdown } from './components/profile-dropdown'
import { getDomainUrl } from './storage'

function IndexPopupContent() {
  // form state
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  /**
   * On opening the popup, we read the current tab's URL and title and prefill the form.
   */
  useEffect(() => {
    void chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      if (tab.url) setUrl(tab.url)
      if (tab.title) setDescription(tab.title)
    })
  }, [])

  const onSubmit = useCallback<React.FormEventHandler>(
    async (e) => {
      e.preventDefault()
      const domain = await getDomainUrl()
      const params = new URLSearchParams({ ogoBrowserExtension: 'true', name, url, description })
      void chrome.tabs.create({ url: `${domain}/new?${params.toString()}` })
    },
    [description, name, url],
  )

  return (
    <div className="grid min-w-[32rem] gap-3 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">ogo</h2>
        <div className="flex gap-0.5">
          <ProfileDropdown />
          <Button
            className="h-auto w-auto p-1.5 text-gray-500"
            onClick={() => {
              chrome.runtime.openOptionsPage()
            }}
            size="icon"
            type="button"
            variant="ghost"
          >
            <SettingsIcon size={16} />
          </Button>
        </div>
      </div>

      <CreateLinkRestriction />

      <form className="grid grid-flow-row gap-5 pt-2" onSubmit={onSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- it is associated with an input */}
        <label className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            Destination URL<span className="text-red-600">*</span>
          </h3>
          <Input
            className="h-12 py-3"
            onChange={(e) => {
              setUrl(e.target.value)
            }}
            placeholder="https://google.com"
            required
            type="url"
            value={url}
          />
        </label>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- it is associated with an input */}
        <label className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            Link Name<span className="text-red-600">*</span>
          </h3>
          <div className="flex h-12 w-full items-center overflow-hidden rounded-md border text-sm focus-within:ring-1 focus-within:ring-ring focus:outline-none">
            <div className="h-full bg-slate-200 px-3 py-3">go/</div>
            <Input
              // eslint-disable-next-line jsx-a11y/no-autofocus -- allow autofocus
              autoFocus
              className="h-full rounded-none border-none focus-visible:ring-0"
              maxLength={256}
              onChange={(e) => {
                setName(e.target.value)
              }}
              pattern="^[A-z0-9_\-]+$"
              placeholder="link"
              required
              title="Only alphanumeric characters, - and _ are allowed."
              type="text"
              value={name}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Description</h3>
          <textarea
            className="w-full rounded-md border p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            maxLength={1000}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            placeholder="Enter a description..."
            rows={2}
            value={description}
          />
        </label>

        <div className="flex gap-3 justify-self-center">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium text-white  transition-colors hover:bg-purple-600"
            type="submit"
          >
            Create go link
          </button>
        </div>
      </form>
    </div>
  )
}

function IndexPopup() {
  return (
    <AuthProvider>
      <IndexPopupContent />
    </AuthProvider>
  )
}

export default IndexPopup
