import React from "react"
import { classNames } from "../utils/string"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

interface StepButtonsProps {
  isFirstStep: boolean
  isLastStep: boolean
  navBackward: () => void
}

export const StepButtons = ({
  isFirstStep,
  isLastStep,
  navBackward,
}: StepButtonsProps) => {
  return (
    <div className='flex w-full flex-row justify-between md:justify-center md:gap-10'>
      <button
        className={classNames(
          !isFirstStep
            ? "border-white text-white"
            : "cursor-not-allowed border-white/20 text-white/20",
          "flex h-12 w-24 items-center justify-center gap-1 rounded-md border-2 border-white bg-transparent"
        )}
        onClick={navBackward}
        disabled={isFirstStep}
      >
        <ChevronLeftIcon className='h-4 w-4' />
        <p>Back</p>
      </button>
      {!isLastStep ? (
        <button
          className='flex h-12 w-24 items-center justify-center gap-1 rounded-md border-2 border-none bg-white font-subtext text-blue-royal'
          type='submit'
        >
          <p>Next</p>
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      ) : (
        <button
          className='flex h-12 w-40 items-center justify-center gap-1 rounded-md border-2 border-none bg-white font-subtext text-blue-royal'
          type='submit'
        >
          <p>Next Section</p>
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  )
}
