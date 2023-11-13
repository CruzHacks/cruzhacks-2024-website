import React from "react"
import TextInput from "../../../components/inputs/TextInput"
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."

const Step01Schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      value => /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(value),
      "Please format digits as 000-000-0000"
    ),
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
        <h1 className='mb-2 font-title text-4xl'>Welcome!</h1>
        <h2 className='text-center font-subtext text-sm md:w-2/3 md:text-base'>
          We&apos;re so excited to have you! Let&apos;s get started with
          registration.
        </h2>

        <TextInput
          Icon={EnvelopeIcon}
          inputProps={{ ...register("email"), placeholder: "Email" }}
          error={errors.email ? errors.email.message : undefined}
        />

        <TextInput
          Icon={UserIcon}
          inputProps={{ ...register("first_name"), placeholder: "First Name" }}
          error={errors.first_name ? errors.first_name.message : undefined}
        />

        <TextInput
          Icon={UserIcon}
          inputProps={{ ...register("last_name"), placeholder: "Last Name" }}
          error={errors.last_name ? errors.last_name.message : undefined}
        />

        <TextInput
          Icon={PhoneIcon}
          inputProps={{
            ...register("phone_number"),
            type: "tel",
            placeholder: "000-000-0000",
          }}
          error={errors.phone_number ? errors.phone_number.message : undefined}
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
