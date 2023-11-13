import React, { useEffect } from "react"
import { z } from "zod"
import {
  AppDemographicsSchema,
  AppLogisticsSchema,
  AppShortResponseSchema,
  AppSocialsSchema,
  AppUserSchema,
} from "../../utils/types"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppState } from "../../hooks/useAppState"
import ProgressBar from "../../components/ProgressBar"

const appSchemas = {
  user: AppUserSchema,
  demographics: AppDemographicsSchema,
  short_response: AppShortResponseSchema,
  logistics: AppLogisticsSchema,
  socials: AppSocialsSchema,
  waivers: z.object({}),
}

const sections = Object.keys(appSchemas)

const isSectionValid = (schema: z.AnyZodObject, data: any) => {
  const res = schema.safeParse(data)
  return res.success
}

const ProgressBarWrapper = () => {
  const location = useLocation()
  const [appState] = useAppState()
  const navigate = useNavigate()

  // Determine current application section
  const slugSplit = location.pathname.split("/")
  const currentSection = slugSplit[slugSplit.length - 1]

  const isSectionEmpty = (key: string) => !appState || !(key in appState)

  // Construct progress bar props
  const steps = sections.map(key => {
    return {
      name: key,
      valid:
        !isSectionEmpty(key) && key !== currentSection
          ? isSectionValid(
              appSchemas[key as keyof typeof appSchemas],
              appState[key]
            )
          : undefined,
    }
  })

  const activeStep =
    currentSection === "review"
      ? sections.length
      : sections.indexOf(currentSection)

  const navSection = (section: string) => {
    if (sections.indexOf(section) == -1) {
      console.error(
        `Can't navigate to section "${section}": Section does not exist`
      )
      return
    }

    if (section == currentSection) return

    navigate(`/apply/${section}`)
  }

  // // Navigate to beginning of form if section is empty on first render
  // useEffect(() => {
  //   if (currentSection != sections[0] && isSectionEmpty(currentSection)) {
  //     navigate(`/apply/${sections[0]}`)
  //   }
  // }, [])

  return (
    <div className='flex items-center justify-between'>
      <ProgressBar steps={steps} activeStep={activeStep} navStep={navSection} />
    </div>
  )
}

export default ProgressBarWrapper
