import { CreateGoLinkForm, CreateGoLinkFormProps } from '@/components/create-go-link/create-go-link-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo, useCallback } from 'react'

import { api } from '../../../utils/api'

type CreateGoLinkProps = {
  isOpen: boolean
  onClose: () => void
} & Pick<CreateGoLinkFormProps, 'description' | 'name' | 'url'>

export const CreateGoLinkModal = memo(function CreateGoLinkModal(props: CreateGoLinkProps) {
  const { isOpen, onClose, ...formProps } = props
  const upsertGoLinkMutation = api.goLink.upsert.useMutation()

  const createGoLink = useCallback(
    (args: { name: string; url: string; description: string }) => {
      if (upsertGoLinkMutation.isLoading) return
      upsertGoLinkMutation.mutate(args, { onSuccess: onClose })
    },
    [upsertGoLinkMutation, onClose]
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
                  onCancel={onClose}
                  onCreateGoLink={createGoLink}
                  isError={upsertGoLinkMutation.isError}
                  isLoading={upsertGoLinkMutation.isLoading}
                  {...formProps}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
})
