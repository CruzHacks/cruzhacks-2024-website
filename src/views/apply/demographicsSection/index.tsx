import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppState } from "../../../hooks/useAppState"
import { AppDemographicsSchema } from "../../../utils/types"
import { z } from "zod"
import toast from "react-hot-toast"
import Step01 from "./Step01"

export interface StepProps {
  isFirstStep: boolean
  isLastStep: boolean
  navForward: (data: any) => void
  navBackward: () => void
}

const steps = [Step01]

const DemographicsSection = () => {
  const navigate = useNavigate()
  const [appState, setAppState] = useAppState()

  const navForward = (data: any) => {
    // Merge form data with existing user data
    const demographicsData =
      appState && appState.demographics
        ? { demographics: { ...appState.user, ...data } }
        : { demographics: data }
    const _appState = { ...appState, ...demographicsData }

    if (isLastStep) {
      try {
        setAppState(_appState)
        AppDemographicsSchema.parse(_appState.demographics)
        navigate("/apply/logistics")
      } catch (err) {
        console.error(err)
        if (err instanceof z.ZodError) {
          err.issues.forEach(issue => {
            toast.error(
              issue.message === "Required"
                ? `Field "${issue.path}" is required.`
                : issue.message
            )
          })
          return
        }
        if (err instanceof Error) {
          toast.error(JSON.stringify(err.message))
          return
        }
        toast.error(JSON.stringify(err))
      }
      return
    }

    setAppState(_appState)
    setStep(step + 1)
  }

  const [step, setStep] = useState(0)
  const CurrentStep = steps[step]

  const isFirstStep = step === 0
  const isLastStep = step === steps.length - 1

  return (
    <div className='h-full'>
      <p className='mb-2 font-subtext uppercase text-white/50'>
        Step {step + 1} of {steps.length}
      </p>
      <div className='h-full pb-10'>
        <CurrentStep
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          navForward={navForward}
          navBackward={() => setStep(step - 1)}
        />
      </div>
    </div>
  )
}

export default DemographicsSection
