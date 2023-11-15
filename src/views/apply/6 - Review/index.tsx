import { ChevronRightIcon } from "@heroicons/react/24/solid"
import React from "react"
import { useAppState } from "../../../hooks/useAppState"

// TODO: printout responses
const ReviewSection = () => {
  const [appState] = useAppState()

  const submitApplication = () => {
    alert("Application Submitted")
    console.log(appState)
  }

  return (
    // ApplicationSection
    <div className='flex h-full grow flex-col md:gap-5'>
      <p className='mb-2 font-subtext uppercase text-white/50'>REVIEW</p>
      <div className='flex h-full grow flex-col pb-10'>
        {/* ApplicationRenderStep */}
        <div className='flex h-full grow flex-col justify-between gap-10'>
          <div className='flex h-full grow flex-col items-stretch justify-center gap-10 md:items-center md:justify-start'>
            {/* Block */}
            <h1 className='pb-2 text-center font-title text-xl md:text-2xl lg:text-4xl'>
              You&apos;re Almost done!
            </h1>

            <div className='max-w-md space-y-5 rounded-3xl bg-white/10 p-5 text-center font-subtext text-sm ring-2 ring-inset ring-white/10'>
              <p>
                Click on the check bubbles above to review your responses from
                that section.
              </p>
              <p>Please review your responses and click “submit.”</p>
              {/* <p>You will be sent a copy of your responses</p> */}
              <p>
                Decisions will be sent in late December or January to the email
                address you provided. Make sure to read the email, as it will
                contain instructions on confirming your spot at CruzHacks 2023.
              </p>
            </div>
          </div>
          {/* navButton */}
          <div className='flex w-full flex-row justify-center md:gap-10'>
            <button
              className='w-30 flex h-10 items-center justify-between gap-1 rounded-2xl border-2 border-none bg-gradient-to-r from-[#00D1FF] to-[#0029FF] px-4 font-subtext text-white'
              type='button'
              onClick={submitApplication}
            >
              <p>Submit</p>
              <ChevronRightIcon className='ml-2 h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSection
