import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."
import RadioInput from "../../../components/inputs/RadioInput"

const StepSchema = z.object({
  year_in_school: z.string(),
})
type StepSchema = z.infer<typeof StepSchema>

const years = [
  "High School",
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
]

const Step02 = ({
  isFirstStep,
  isLastStep,
  navForward,
  navBackward,
}: StepProps) => {
  const [appState] = useAppState()
  const defaultValues =
    appState && appState.demographics ? appState.demographics : {}
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepSchema>({
    defaultValues,
    resolver: zodResolver(StepSchema),
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
      <div className='flex flex-col items-center justify-center md:justify-start md:gap-5'>
        <h1 className='text-center font-subtext text-2xl md:text-3xl'>
          What year are you in?
        </h1>

        <div className='h-0 md:h-10'></div>

        <div className='w-full'>
          <RadioInput items={years} name='year_in_school' control={control} />
        </div>
      </div>

      <StepButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        navBackward={navBackward}
      />
    </form>
  )
}

export default Step02
