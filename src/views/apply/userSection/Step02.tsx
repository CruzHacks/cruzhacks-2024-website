import React from "react"
import TextInput from "../../../components/inputs/TextInput"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StepButtons } from "../../../components/StepButtons"
import { useAppState } from "../../../hooks/useAppState"
import { StepProps } from "."

const Step02Schema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Password confirmation is required"),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

type Step02Schema = z.infer<typeof Step02Schema>

const Step02 = ({
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
  } = useForm<Step02Schema>({
    defaultValues,
    resolver: zodResolver(Step02Schema),
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
      className='flex h-full grow flex-col items-center justify-between gap-5'
      onSubmit={handleSubmit(refineForm(navForward))}
    >
      <div className='flex flex-col items-center justify-center md:justify-start md:gap-3'>
        <h1 className='mb-2 font-title text-4xl'>Password</h1>
        <TextInput
          Icon={LockClosedIcon}
          inputProps={{
            ...register("password"),
            type: "password",
            placeholder: "Password",
          }}
          error={errors.password && errors.password.message}
        />

        <TextInput
          Icon={LockClosedIcon}
          inputProps={{
            ...register("confirm_password"),
            type: "password",
            placeholder: "Confirm Password",
          }}
          error={errors.confirm_password && errors.confirm_password.message}
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

export default Step02
