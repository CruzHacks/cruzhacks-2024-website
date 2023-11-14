import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."
import ComboboxInput from "../../../components/inputs/ComboboxInput"
import TextareaInput from "../../../components/inputs/TextareaInput"

const StepSchema = z.object({
  first_cruzhacks: z.string(),
  hackathon_experience: z.string(),
  tech_experience: z.string().max(1500, "Character limit exceeded."),
})
type StepSchema = z.infer<typeof StepSchema>

const yesNo = ["Yes", "No"]

const numberOfHackathons = ["First Hackathon", "1-3", "4-6", "7+"]

const Step04 = ({
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
    register,
    formState: { errors },
  } = useForm<StepSchema>({
    defaultValues,
    resolver: zodResolver(StepSchema),
  })

  const [queryFirstTime, setQueryFirstTime] = useState("")

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
        <div className='flex flex-col items-center justify-center gap-5'>
          <p className='text-center font-subtext'>
            Will this be your first time attending CruzHacks?
          </p>
          <ComboboxInput
            query={queryFirstTime}
            setQuery={setQueryFirstTime}
            items={yesNo}
            name='first_cruzhacks'
            control={control}
            error={
              errors.first_cruzhacks
                ? errors.first_cruzhacks.message
                : undefined
            }
          />
        </div>

        <div className='flex flex-col items-center justify-center gap-5'>
          <p className='text-center font-subtext'>
            Have you attended any hackathons before? If so, how many?
          </p>
          <ComboboxInput
            query={queryFirstTime}
            setQuery={setQueryFirstTime}
            items={numberOfHackathons}
            name='hackathon_experience'
            control={control}
            error={
              errors.hackathon_experience
                ? errors.hackathon_experience.message
                : undefined
            }
          />
        </div>

        <div className='flex flex-col items-center justify-center gap-5'>
          <p className='text-center font-subtext'>
            Do you have prior tech experience? If so, in what context (i.e.
            classes, internships, personal projects)?
          </p>
          <TextareaInput
            inputProps={{ ...register("tech_experience") }}
            showCount={false}
            error={
              errors.hackathon_experience
                ? errors.hackathon_experience.message
                : undefined
            }
          />
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

export default Step04
