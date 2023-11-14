import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppState } from "../../../hooks/useAppState"
import { AppDemographicsSchema } from "../../../utils/types"
import { z } from "zod"
import toast from "react-hot-toast"
import RenderStep, { Step } from "../RenderStep"

const steps: Step[] = [
  // Step 1
  [
    [
      { text: "Demograhpic Information", type: "title" },
      <h2
        key={"demographic_note"}
        className='text-center text-xs md:w-2/3 md:text-sm'
      >
        The information collected here will be used for statistical purposes
        only. In accordance with the{" "}
        <a href='https://mlh.io/privacy' className='text-blue-button'>
          MLH Privacy Polich
        </a>
      </h2>,
    ],
    [
      { text: "What's your age?" },
      {
        inputType: "text",
        field: "age",
        additionalInputProps: {
          type: "number",
          placeholder: "How old are you?",
        },
      },
    ],
    [
      { text: "Where do you reside?" },
      { inputType: "combo", field: "country", options: ["USA", "Canada"] },
    ],
  ],

  // Step 2
  // [],
]

const DemographicsSection = () => {
  const navigate = useNavigate()
  const [appState, setAppState] = useAppState()

  const [step, setStep] = useState(0)

  const isFirstStep = step === 0
  const isLastStep = step === steps.length - 1

  const navForward = (data: any) => {
    // Merge form data with existing user data
    const demographicsData =
      appState && appState.demographics
        ? { demographics: { ...appState.demographics, ...data } }
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

  return (
    <div className='h-full'>
      <p className='mb-2 font-subtext uppercase text-white/50'>
        Step {step + 1} of {steps.length}
      </p>
      <div className='h-full pb-10'>
        <RenderStep
          step={steps[step]}
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
