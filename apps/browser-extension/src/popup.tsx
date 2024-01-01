/**
 * This is the main popup component that is rendered when the user clicks on the extension icon.
 *
 * @see https://docs.plasmo.com/framework/ext-pages
 */

import { Settings as SettingsIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import '@repo/ui/global.css'
import './styles.css'

import { toast } from 'react-hot-toast'

import { Button, Input } from '@repo/ui'

import { CreateLinkRestriction } from './components/create-link-restriction'
import { ProfileDropdown } from './components/profile-dropdown'
import { Providers } from './providers/providers'
import { useCreateGoLinkMutation } from './queries/create-go-link'

function IndexPopupContent() {
  // form state
  const [destination, setDestination] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')

  const createGoLink = useCreateGoLinkMutation()

  /**
   * On opening the popup, we read the current tab's URL and title and prefill the form.
   */
  useEffect(() => {
    void chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
      if (tab.url) {
        let destinationUrl = tab.url.trim()
        if (destinationUrl.endsWith('/')) {
          destinationUrl = destinationUrl.slice(0, -1)
        }
        setDestination(destinationUrl)
      }
      if (tab.title) setDescription(tab.title)
    })
  }, [])

  const onSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault()
      createGoLink.mutate(
        { destination, slug, description },
        {
          onSuccess() {
            toast.success(
              <span>
                <b>go/{slug}</b> created!
              </span>,
              { duration: 5000 },
            )
          },
          onError() {
            toast.error('Something went wrong.')
          },
        },
      )
    },
    [createGoLink, destination, slug, description],
  )

  return (
    <div className="grid min-w-[32rem] gap-3 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">ogo</h2>
        <div className="flex">
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
              setDestination(e.target.value)
            }}
            placeholder="https://google.com"
            required
            type="url"
            value={destination}
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
                setSlug(e.target.value)
              }}
              pattern="^[A-z0-9_\-]+$"
              placeholder="link"
              required
              title="Only alphanumeric characters, - and _ are allowed."
              type="text"
              value={slug}
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
            disabled={createGoLink.isPending}
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
    <Providers>
      <IndexPopupContent />
    </Providers>
  )
}

export default IndexPopup
