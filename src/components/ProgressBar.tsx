import React from "react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { Link, useLocation } from "react-router-dom"

interface SegmentProps {
  completed: boolean
  active: boolean
}

const LineSegment = ({ completed, active }: SegmentProps) => {
  if (completed || active) {
    return <div className='flex h-0.5 w-full bg-[#06F]' />
  } else {
    return <div className='flex h-0.5 w-full bg-[#676D84]' />
  }
}

const BubbleSegment = ({ completed, active }: SegmentProps) => {
  if (completed) {
    return (
      <div className='text-black h-5 w-5 rounded-full border-2 border-[#06F] bg-[#06F]'>
        <CheckIcon className='h-4 w-4' aria-hidden='true' />
      </div>
    )
  } else if (active) {
    return (
      <div className='text-black h-5 w-5  rounded-full border-2 border-[#06F] bg-[#31375E]'>
        <div className='h-4 w-4' />
      </div>
    )
  } else {
    return (
      <div className='h-5 w-5 rounded-full border-2 border-[#676D84] bg-[#31375E]'>
        <div className='h-4 w-4' />
      </div>
    )
  }
}

interface ProgressBarProps {
  steps: string[]
}

const ProgressBar = ({ steps }: ProgressBarProps) => {
  const location = useLocation()
  const slugSplit = location.pathname.split("/")
  const currentSection = slugSplit[slugSplit.length - 1]
  // translate url page to progress step
  const activeStep =
    currentSection === "review" ? steps.length : steps.indexOf(currentSection)

  return (
    <div className='relative flex w-full flex-row flex-nowrap items-center'>
      {steps.map((step, index) => (
        <div
          key={index}
          className={
            index === 0
              ? "relative flex flex-row items-center justify-end"
              : "relative flex w-full flex-row items-center justify-end"
          }
        >
          {index !== 0 && (
            <LineSegment
              completed={index < activeStep}
              active={index === activeStep}
            />
          )}
          <Link to={`/apply/${step}`}>
            <BubbleSegment
              completed={index < activeStep}
              active={index === activeStep}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProgressBar
