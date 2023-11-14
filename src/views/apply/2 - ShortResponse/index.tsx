import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppState } from "../../../hooks/useAppState"
import { AppShortResponseSchema } from "../../../utils/types"
import {
  mergeAppState,
  notifyValidationErrors,
} from "../../../utils/hackerapplication"
import ApplicationRenderStep from "../ApplicationRenderStep"
import { shortResponseSteps } from "./form"

// NOTE: Form sections are routed to using react-dom-router. Routes are defined
// in src/App.tsx. The route for this section is "/apply/short_response"

const section = "short_response"
const sectionSchema = AppShortResponseSchema

const ShortResponseSection = () => {
  const navigate = useNavigate()
  const [appState, setAppState] = useAppState()

  const [step, setStep] = useState(0)

  // RenderStep props
  const isFirstStep = step === 0
  const isLastStep = step === shortResponseSteps.length - 1

  const navForward = (data: any) => {
    const _appState = mergeAppState(section, data, appState)
    setAppState(_appState)

    // Navigate to next section if this is the last step
    if (isLastStep) {
      try {
        sectionSchema.parse(_appState[section])
        navigate("/apply/logistics")
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
        Step {step + 1} of {shortResponseSteps.length}
      </p>
      <div className='h-full pb-10'>
        <ApplicationRenderStep
          step={shortResponseSteps[step]}
          section={section}
          sectionSchema={sectionSchema}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          navForward={navForward}
          navBackward={navBackward}
        />
      </div>
    </div>
  )
}

export default ShortResponseSection
