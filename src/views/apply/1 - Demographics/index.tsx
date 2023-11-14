import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppState } from "../../../hooks/useAppState"
import { AppDemographicsSchema } from "../../../utils/types"
import RenderStep from "../RenderStep"
import { demographicSteps } from "./demograhpicsFormData"
import {
  mergeAppState,
  notifyValidationErrors,
} from "../../../utils/hackerapplication"

// NOTE: Form sections are routed to using react-dom-router. Routes are defined
// in src/App.tsx. The route for this section is "/apply/demographics"

const DemographicsSection = () => {
  const navigate = useNavigate()
  const [appState, setAppState] = useAppState()

  const [step, setStep] = useState(0)

  // RenderStep props
  const isFirstStep = step === 0
  const isLastStep = step === demographicSteps.length - 1

  const navForward = (data: any) => {
    const _appState = mergeAppState("demographics", data, appState)
    setAppState(_appState)

    // Navigate to next section if this is the last step
    if (isLastStep) {
      try {
        AppDemographicsSchema.parse(_appState.demographics)
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
        <RenderStep
          step={demographicSteps[step]}
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
