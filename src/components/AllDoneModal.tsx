import React, { Dispatch, Fragment, SetStateAction } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { FaceSmileIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

interface AllDoneModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AllDoneModal({ open, setOpen }: AllDoneModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-90'
          leave='ease-in duration-200'
          leaveFrom='opacity-90'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-blue-imperial/70 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative overflow-hidden rounded-lg bg-blue-imperial px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-button/20'>
                    <FaceSmileIcon
                      className='h-8 w-8 text-gold'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-white'
                    >
                      You did it!
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-white/70'>
                        Keep a look out for application decisions in your email.
                        Or check your application status in the portal.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <Link
                    to='/portal'
                    className='inline-flex w-full justify-center rounded-md bg-blue-button/50 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-button/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-button'
                    onClick={() => setOpen(false)}
                  >
                    Login to Portal
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}