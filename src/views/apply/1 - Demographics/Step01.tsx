import React from "react"
import TextInput from "../../../components/inputs/TextInput"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."
import ComboboxInput from "../../../components/inputs/ComboboxInput"

const Step01Schema = z.object({
  age: z
    .number({ invalid_type_error: "Please include an age" })
    .min(1, "Please include an age")
    .min(12, "Must be at least 12 years old")
    .max(120, "Invalid age"),
  country: z.string().min(1, "Please select a country"),
  school: z.string().min(1, "Please select a school"),
})
type Step01Schema = z.infer<typeof Step01Schema>

// TODO: Fetch countries from API
const countries = ["United States", "Canada", "Mexico", "Other"]

const Step01 = ({
  isFirstStep,
  isLastStep,
  navForward,
  navBackward,
}: StepProps) => {
  const [appState] = useAppState()
  const defaultValues =
    appState && appState.demographics ? appState.demographics : {}
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step01Schema>({
    defaultValues,
    resolver: zodResolver(Step01Schema),
  })

  const [queryCountry, setQueryCountry] = React.useState("")

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
        <h1 className='text-center font-title text-2xl md:text-3xl'>
          Demographic Information
        </h1>
        <h2 className='text-center text-xs md:w-2/3 md:text-sm'>
          The information collected here will be used for statistical purposes
          only. In accordance with the{" "}
          <a href='https://mlh.io/privacy' className='text-blue-button'>
            MLH Privacy Polich
          </a>
        </h2>

        <div className='pt-5 md:pt-0'>
          <p className='-mb-5 text-center font-subtext'>
            What&apos;s your age?
          </p>
          <TextInput
            inputProps={{
              ...register("age", { valueAsNumber: true }),
              type: "number",
              placeholder: "How old are you?",
            }}
            error={errors.age ? errors.age.message : undefined}
          />
        </div>

        <div className='py-5'>
          <p className='text-center font-subtext'>Where do you reside?</p>
          <ComboboxInput
            query={queryCountry}
            setQuery={setQueryCountry}
            items={countries}
            name='country'
            control={control}
            error={errors.country ? errors.country.message : undefined}
          />
        </div>

        <div className='py-5'>
          <p className='text-center font-subtext'>What school do you attend?</p>
          <p className='text-center font-subtext'>Or most recently attended?</p>
          <TextInput
            inputProps={{ ...register("school"), placeholder: "School Name" }}
            error={errors.school ? errors.school.message : undefined}
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

export default Step01
