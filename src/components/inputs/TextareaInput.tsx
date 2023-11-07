import React from "react"
import { classNames } from "../../utils/string"

interface TextareaInputProps {
  rows?: number
  inputStyling?: string
  showCount?: boolean
  error?: string
  maxLength?: number
}

const TextareaInput = ({
  rows = 4,
  error,
  showCount = true,
  maxLength = 1500,
}: TextareaInputProps) => {
  // TODO: When integrating with react-hook-form there will be a way to get the
  // current length, similarly the maxLength will be validated with zod and
  // react-hook-form
  const currentLength = 0
  return (
    <>
      <div
        className={classNames(
          error
            ? "bg-error/10 ring-error/10 focus-within:ring-error/50"
            : "bg-white/10 ring-white/5 focus-within:ring-white/40",
          "mt-2 gap-3 space-y-1 rounded-md p-4 pb-2 shadow-sm ring ring-inset"
        )}
      >
        <textarea
          rows={rows}
          name='comment'
          id='comment'
          className={classNames(
            error
              ? "text-error placeholder:text-error/60"
              : "text-white placeholder:text-white/60",
            "block w-full resize-none border-0 bg-transparent font-subtext shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
          )}
          placeholder='Your answer'
        />
        {showCount && (
          <p
            className={classNames(
              error ? "text-error" : "text-white",
              "w-full text-right font-subtext"
            )}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>

      {error && <p className='mt-2 text-sm text-error'>{error}</p>}
    </>
  )
}

export default TextareaInput
