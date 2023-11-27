import React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { approveApplication, denyApplication } from "../utils/apis/firebase"

interface AcceptButtonsProps {
    email: string
}

export const AcceptButtons = ({ email }: AcceptButtonsProps) => {
  return (
    <div className='bg-red flex w-full flex-row justify-between md:justify-center md:gap-10'>
        <button
            type='button'
            className="flex h-10 w-24 items-center justify-between gap-1 rounded-2xl border-2 border-white bg-transparent px-4"
            onClick={() => {denyApplication(email)}}
        >
            <ChevronLeftIcon className='mr-2 h-4 w-4' />
            <p>Deny</p>
        </button>
        <button
            type='button'
            className='font-subtext text-blue-royal flex h-10 w-24 items-center justify-between gap-1 rounded-2xl border-2 border-none bg-white px-4'
            onClick={() => {approveApplication(email)}}
        >
            <p>Accept</p>
            <ChevronRightIcon className='ml-2 h-4 w-4' />
        </button>
    </div>
  )
}
