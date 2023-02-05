import { edgeConfigLimits } from '@/constants'
import { memo, useCallback, useState } from 'react'

export type CreateGoLinkFormProps = {
  onCancel: () => void
  onCreateGoLink: (args: { name: string; url: string; description: string }) => void
  url?: string
  name?: string
  description?: string
  isError?: boolean
  isLoading?: boolean
}

export const CreateGoLinkForm = memo(function CreateGoLinkForm(props: CreateGoLinkFormProps) {
  const { onCancel, onCreateGoLink, isLoading, isError } = props

  const [url, setUrl] = useState(props.url ?? '')
  const [name, setName] = useState(props.name ?? '')
  const [description, setDescription] = useState(props.description ?? '')

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      onCreateGoLink({ name, url, description })
    },
    [description, name, onCreateGoLink, url]
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

      {isError && <div className="text-red-600">Something went wrong, try again later.</div>}

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
          disabled={isLoading}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium  text-white hover:bg-purple-600"
        >
          Create go link
        </button>
      </div>
    </form>
  )
})
