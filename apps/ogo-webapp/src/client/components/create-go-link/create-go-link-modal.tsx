import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo, useCallback, useState } from 'react'

import { api } from '../../../utils/api'
import { edgeConfigLimits } from '../../../utils/edge-config-limits'

type CreateGoLinkProps = {
  isOpen: boolean
  onClose: () => void
} & Pick<CreateGoLinkFormProps, 'description' | 'name' | 'url'>

export const CreateGoLinkModal = memo(function CreateGoLinkModal(props: CreateGoLinkProps) {
  const { isOpen, onClose, ...formProps } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl rounded-xl bg-white p-6 text-left ">
                <Dialog.Title as="h2" className="text-2xl font-medium text-black">
                  Create new go link
                </Dialog.Title>

                <CreateGoLinkForm onCancel={onClose} onDone={onClose} {...formProps} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
})

type CreateGoLinkFormProps = {
  onCancel: () => void
  onDone: () => void
  url?: string
  name?: string
  description?: string
}

const CreateGoLinkForm = memo(function CreateGoLinkForm(props: CreateGoLinkFormProps) {
  const { onCancel, onDone } = props
  const upsertGoLinkMutation = api.go.upsertGolink.useMutation()

  const [url, setUrl] = useState(props.url ?? '')
  const [name, setName] = useState(props.name ?? '')
  const [description, setDescription] = useState(props.description ?? '')

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      if (upsertGoLinkMutation.isLoading) return
      upsertGoLinkMutation.mutate({ name, url, description }, { onSuccess: onDone })
    },
    [description, name, onDone, upsertGoLinkMutation, url]
  )

  return (
    <form className="grid grid-flow-row gap-5 pt-6" onSubmit={onSubmit}>
      <label className="flex flex-col gap-1">
        <h3 className="font-medium text-gray-700">
          Destination URL<span className="text-red-600">*</span>
        </h3>
        <input
          className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://google.com"
          required
          type="url"
          value={url}
        />
      </label>

      <label className="flex flex-col gap-1">
        <h3 className="font-medium text-gray-700">
          Link Name<span className="text-red-600">*</span>
        </h3>
        <div className="flex w-full items-center overflow-hidden rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none">
          <div className="bg-gray-200 py-3 px-3">go/</div>
          <input
            className="w-full p-3 focus:outline-none"
            maxLength={edgeConfigLimits.maxKeyLength}
            onChange={(e) => setName(e.target.value)}
            pattern={edgeConfigLimits.keyRegexPattern}
            placeholder="link"
            required
            title="Only alphanumeric characters, - and _ are allowed."
            type="text"
            value={name}
          />
        </div>
      </label>

      <label className="flex flex-col gap-1">
        <h3 className="font-medium text-gray-700">Description</h3>
        <textarea
          className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-600 focus:outline-none"
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Enter a description..."
          value={description}
        ></textarea>
      </label>

      {upsertGoLinkMutation.error && <div className="text-red-600">Something went wrong, try again later.</div>}

      {/* Buttons */}
      <div className="flex gap-3 justify-self-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          disabled={upsertGoLinkMutation.isLoading}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium  text-white hover:bg-purple-600"
        >
          Create go link
        </button>
      </div>
    </form>
  )
})
