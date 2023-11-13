import { RadioGroup } from "@headlessui/react"
import React, { useState } from "react"
import { classNames } from "../../utils/string"
import { Controller } from "react-hook-form"

interface RadioInputProps {
  items: string[]
  other?: boolean
  noAnswer?: boolean
  arrange?: "vertical" | "vertical-inline"
  name: string
  control: any
}

const RadioInput = ({
  items,
  other,
  arrange = "vertical",

  name,
  control,
}: RadioInputProps) => {
  const [otherSelected, setOtherSelected] = useState(false)
  const [otherValue, setOtherValue] = useState("")

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value } }) => (
        <>
          <RadioGroup
            value={otherSelected ? null : value}
            onChange={item => {
              onChange(item || "")
              setOtherSelected(false)
            }}
            className='mt-2'
          >
            <div
              className={classNames(
                arrange === "vertical" && "flex flex-col gap-5",
                arrange === "vertical-inline" && "flex flex-row flex-wrap gap-5"
              )}
            >
              {items.map(item => (
                <RadioGroup.Option
                  key={item}
                  value={item}
                  className={({ active, checked }) =>
                    classNames(
                      arrange === "vertical" && "w-full",
                      arrange === "vertical-inline" && "w-fit",
                      active ? "ring-white/5 ring-offset-2" : "",
                      checked
                        ? "bg-gradient-to-r from-[#00D1FF] to-[#0029FF] text-white"
                        : "bg-white/10 hover:bg-white/20",
                      "flex items-center justify-center rounded-full px-5 py-3 font-subtext text-sm font-semibold ring ring-inset ring-white/5"
                    )
                  }
                >
                  <RadioGroup.Label as='span'>{item}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {other && (
            <button
              className={classNames(
                otherSelected
                  ? "bg-gradient-to-r from-[#00D1FF] to-[#0029FF] text-white"
                  : "bg-white/10 hover:bg-white/20",
                "mt-5 flex w-full items-center justify-center gap-3 rounded-full px-3 py-3 font-subtext text-sm font-semibold ring ring-inset ring-white/5 focus-within:ring-white/5 focus-within:ring-offset-2"
              )}
              onClick={() => {
                setOtherSelected(true)
                onChange(otherValue)
              }}
            >
              <p className='ml-10'>Other: </p>
              <input
                className='mr-10 block w-full border-0 border-b-2 border-white/40 bg-transparent p-0 pr-10 text-white ring-0 placeholder:text-white/60 focus:border-white/80 focus:ring-0 sm:text-lg'
                value={otherValue}
                placeholder='Type here'
                onChange={event => {
                  setOtherValue(event.target.value)
                  onChange(event.target.value)
                }}
              />
            </button>
          )}
        </>
      )}
    />
  )
}

export default RadioInput
