import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AppDemographicsSchema } from "../../utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { classNames } from "../../utils/string"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

const UserSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppDemographicsSchema>({
    resolver: zodResolver(AppDemographicsSchema),
  })

  const handleApplicationSubmit: SubmitHandler<
    AppDemographicsSchema
  > = async data => {
    console.log(data)
  }

  const navigate = useNavigate()

  const [step, setPage] = useState(0)
  const num_steps = 2

  const isFirstStep = step === 0
  const isLastStep = step === num_steps - 1

  return (
    <>
      <p className='mb-2 font-subtext uppercase text-white/50'>
        Step {step} of {num_steps}
      </p>
      <div className='flex h-full w-full flex-col items-center justify-between pb-10'>
        <h1 className='font-title text-xl'>Create An Account</h1>

        {/* Step buttons */}
        <div className='flex w-full flex-row justify-between md:justify-center md:gap-10'>
          <button
            className={classNames(
              !isFirstStep
                ? "border-white text-white"
                : "cursor-not-allowed border-white/20 text-white/20",
              "flex h-12 w-24 items-center justify-center gap-1 rounded-md border-2 border-white bg-transparent"
            )}
            onClick={() => setPage(step - 1)}
            disabled={isFirstStep}
          >
            <ChevronLeftIcon className='h-4 w-4' />
            <p>Back</p>
          </button>
          {!isLastStep ? (
            <button
              className='flex h-12 w-24 items-center justify-center gap-1 rounded-md border-2 border-none bg-white font-subtext text-blue-royal'
              onClick={() => setPage(step + 1)}
            >
              <p>Next</p>
              <ChevronRightIcon className='h-4 w-4' />
            </button>
          ) : (
            <button
              className='flex h-12 w-40 items-center justify-center gap-1 rounded-md border-2 border-none bg-white font-subtext text-blue-royal'
              onClick={() => navigate("/apply/demographics")}
            >
              <p>Next Section</p>
              <ChevronRightIcon className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default UserSection
