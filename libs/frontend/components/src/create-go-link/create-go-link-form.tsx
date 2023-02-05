import { edgeConfigLimits } from '@/constants'
import { memo, useCallback, useState } from 'react'

export type CreateGoLinkFormProps = React.PropsWithChildren<{
  onCreateGoLink: (args: { name: string; url: string; description: string }) => void
  url?: string
  name?: string
  description?: string
  errorMessage?: string
}>

export const CreateGoLinkForm = memo(function CreateGoLinkForm(props: CreateGoLinkFormProps) {
  const { onCreateGoLink, errorMessage, children } = props

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
    <form className="grid w-full grid-flow-row gap-5 pt-6" onSubmit={onSubmit}>
      <label className="flex flex-col gap-1">
        <h3 className="font-medium text-gray-700">
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
        <h3 className="font-medium text-gray-700">
          Link Name<span className="text-red-600">*</span>
        </h3>
        <div className="flex w-full items-center overflow-hidden rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none">
          <div className="h-full bg-gray-200 py-3 px-3">go/</div>
          <input
            className="w-full rounded-md rounded-l-none border-transparent p-3 text-sm text-gray-600 focus:border"
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
          className="w-full rounded-md border-gray-300 p-3 text-sm text-gray-600"
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Enter a description..."
          value={description}
        ></textarea>
      </label>

      {errorMessage && <div className="text-red-600">{errorMessage}</div>}

      {children}
    </form>
  )
})
