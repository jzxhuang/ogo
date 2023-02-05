import { CreateGoLinkForm, CreateGoLinkFormProps } from '@/components/create-go-link/create-go-link-form'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, memo, useCallback } from 'react'

import { api } from '../../../utils/api'

type CreateGoLinkProps = {
  isOpen: boolean
  onClose: () => void
} & Pick<CreateGoLinkFormProps, 'description' | 'name' | 'url'>

export const CreateGoLinkModal = memo(function CreateGoLinkModal(props: CreateGoLinkProps) {
  const { isOpen, onClose, ...formProps } = props
  const router = useRouter()

  const createGoLinkMutation = api.goLink.create.useMutation()
  const createGoLink = useCallback(
    (args: { name: string; url: string; description: string }) => {
      if (createGoLinkMutation.isLoading) return
      createGoLinkMutation.mutate(args, { onSuccess: () => router.push(`/new/success?name=${args.name}`) })
    },
    [createGoLinkMutation, router]
  )

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

                <CreateGoLinkForm
                  onCreateGoLink={createGoLink}
                  errorMessage={createGoLinkMutation.error?.message}
                  {...formProps}
                >
                  {/* Buttons */}
                  <div className="flex gap-3 justify-self-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={createGoLinkMutation.isLoading}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 font-medium  text-white hover:bg-purple-600"
                    >
                      Create go link
                    </button>
                  </div>
                </CreateGoLinkForm>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
})
