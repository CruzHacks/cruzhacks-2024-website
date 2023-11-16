import React, { useEffect, useState } from "react"
import { AppStateProvider } from "../../contexts/applicationState"
import ProgressBarWrapper from "./ApplicationProgressBar"
import { Outlet } from "react-router-dom"
import ApplicationSection from "./ApplicationSection"
import {
  AppDemographicsSchema,
  AppLogisticsSchema,
  AppShortResponseSchema,
  AppSocialsSchema,
  AppWaiversSchema,
} from "../../utils/types"
import { demographicSteps } from "./sectionForms/demographics"
import { shortResponseSteps } from "./sectionForms/shortResponse"
import { logisticsStep } from "./sectionForms/logistics"
import { socialsSteps } from "./sectionForms/socials"
import { waiversSteps } from "./sectionForms/waivers"
import WillLoseProgressModal from "../../components/WillLoseProgressModal"
import { useAppState } from "../../hooks/useAppState"

const WillLoseProgress = () => {
  const [open, setOpen] = useState(false)

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ""
    setOpen(true)
  }

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser)

    return () => {
      window.removeEventListener("beforeunload", alertUser)
    }
  })

  return <WillLoseProgressModal open={open} setOpen={setOpen} />
}

const WillLoseProgressWrapper = () => {
  const [appState] = useAppState()

  if (!(appState && appState.form_submitted)) {
    return <WillLoseProgress />
  }

  return <></>
}

// Apply routes wrapper
const Apply = () => {
  return (
    <AppStateProvider>
      <WillLoseProgressWrapper />
      <div className='flex min-h-screen flex-col items-center'>
        <div className='w-full max-w-4xl p-8 md:px-20 md:py-16'>
          <ProgressBarWrapper />
        </div>

        <div className='flex h-full w-full max-w-4xl grow flex-col rounded-t-3xl bg-[#4659FF]/10 px-10 py-5 md:p-10 lg:mb-16 lg:rounded-3xl'>
          <Outlet />
        </div>
      </div>
    </AppStateProvider>
  )
}

/**
 * NOTE: Form sections are routed to using react-dom-router. Routes are defined
 * in src/App.tsx.
 */

// ROUTE: /apply/user
// ./0 - User/index.tsx

// ROUTE: /apply/demographics
export const DemographicsSection = () => {
  return (
    <ApplicationSection
      section={"demographics"}
      sectionSchema={AppDemographicsSchema}
      steps={demographicSteps}
      nextSection={"short_response"}
    />
  )
}

// ROUTE: /apply/short_response
export const ShortResponseSection = () => {
  return (
    <ApplicationSection
      section={"short_response"}
      sectionSchema={AppShortResponseSchema}
      steps={shortResponseSteps}
      nextSection={"logistics"}
    />
  )
}

// ROUTE: /apply/logistics
export const LogisticsSection = () => {
  return (
    <ApplicationSection
      section={"logistics"}
      sectionSchema={AppLogisticsSchema}
      steps={logisticsStep}
      nextSection={"socials"}
    />
  )
}

// ROUTE: /apply/socials
export const SocialsSection = () => {
  return (
    <ApplicationSection
      section={"socials"}
      sectionSchema={AppSocialsSchema}
      steps={socialsSteps}
      nextSection={"waivers"}
    />
  )
}

// ROUTE: /apply/waivers
// TODO: Define Section schema
export const WaviersSection = () => {
  return (
    <ApplicationSection
      section={"waivers"}
      sectionSchema={AppWaiversSchema}
      steps={waiversSteps}
      nextSection={"review"}
    />
  )
}

export default Apply
