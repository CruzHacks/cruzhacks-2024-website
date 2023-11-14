import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppState } from "../../../hooks/useAppState"
import { AppDemographicsSchema } from "../../../utils/types"
import { demographicSteps } from "./form"
import {
  mergeAppState,
  notifyValidationErrors,
} from "../../../utils/hackerapplication"
import ApplicationRenderStep from "../ApplicationRenderStep"

// NOTE: Form sections are routed to using react-dom-router. Routes are defined
// in src/App.tsx. The route for this section is "/apply/demographics"

const section = "demographics"
const sectionSchema = AppDemographicsSchema

const DemographicsSection = () => {
  const navigate = useNavigate()
  const [appState, setAppState] = useAppState()

  const [step, setStep] = useState(0)

  // RenderStep props
  const isFirstStep = step === 0
  const isLastStep = step === demographicSteps.length - 1

  const navForward = (data: any) => {
    const _appState = mergeAppState(section, data, appState)
    setAppState(_appState)

    // Navigate to next section if this is the last step
    if (isLastStep) {
      try {
        sectionSchema.parse(_appState[section])
        navigate("/apply/short_response")
      } catch (err) {
        notifyValidationErrors(err)
      }
      return
    }

    setStep(step + 1)
  }

  const navBackward = () => {
    setStep(step - 1)
  }

  return (
    <div className='h-full'>
      <p className='mb-2 font-subtext uppercase text-white/50'>
        Step {step + 1} of {demographicSteps.length}
      </p>
      <div className='h-full pb-10'>
        <ApplicationRenderStep
          step={demographicSteps[step]}
          section={section}
          sectionSchema={AppDemographicsSchema}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          navForward={navForward}
          navBackward={navBackward}
        />
      </div>
    </div>
  )
}

export default DemographicsSection
