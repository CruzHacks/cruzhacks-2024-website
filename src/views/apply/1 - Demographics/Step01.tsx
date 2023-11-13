import React from "react"
import TextInput from "../../../components/inputs/TextInput"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."

const Step01Schema = z.object({
  age: z

    .number({ invalid_type_error: "Please include an age" })
    .min(1, "Please include an age")
    .min(12, "Must be at least 12 years old")
    .max(120, "Invalid age"),
})

type Step01Schema = z.infer<typeof Step01Schema>

const Step01 = ({
  isFirstStep,
  isLastStep,
  navForward,
  navBackward,
}: StepProps) => {
  const [appState] = useAppState()
  const defaultValues = appState && appState.user ? appState.user : {}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step01Schema>({
    defaultValues,
    resolver: zodResolver(Step01Schema),
  })

  /**
   * Refines form data to match Application Schema
   * @param data form data from schema
   * @returns valid Application Schema properties
   */
  const refineForm = (data: any) => {
    return data
  }

  return (
    <form
      className='flex h-full flex-col items-center justify-between gap-5'
      onSubmit={handleSubmit(refineForm(navForward))}
    >
      <div className='flex flex-col items-center justify-center md:justify-start md:gap-3'>
        <h1 className='mb-2 font-title text-4xl'>Demographic Information</h1>
        <h2 className='text-center font-subtext text-sm md:w-2/3 md:text-base'>
          The information collected here will be used for statistical purposes
          only. In accordance with the{" "}
          <a href='https://mlh.io/privacy' className='text-blue-button'>
            MLH Privacy Polich
          </a>
        </h2>

        <TextInput
          inputProps={{
            ...register("age", { valueAsNumber: true }),
            type: "number",
            placeholder: "How old are you?",
          }}
          error={errors.age ? errors.age.message : undefined}
        />
      </div>

      <StepButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        navBackward={navBackward}
      />
    </form>
  )
}

export default Step01
