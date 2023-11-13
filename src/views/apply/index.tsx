import React from "react"
import { AppStateProvider } from "../../contexts/applicationState"
import ProgressBarWrapper from "./ApplicationProgressBar"
import { Outlet } from "react-router-dom"

const Apply = () => {
  return (
    <AppStateProvider>
      <div className='flex h-full min-h-screen flex-col items-center md:h-screen'>
        <div className='w-full max-w-4xl p-8 md:px-20 md:py-16'>
          <ProgressBarWrapper />
        </div>

        <div className='relative h-full w-full max-w-4xl grow rounded-t-3xl bg-[#4659FF]/10 px-10 py-5 md:p-10 lg:mb-16 lg:rounded-3xl'>
          <Outlet />
        </div>
      </div>
    </AppStateProvider>
  )
}

export default Apply
