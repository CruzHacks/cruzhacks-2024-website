import React, { isValidElement, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAppState } from "../../hooks/useAppState"
import { AppDemographicsSchema } from "../../utils/types"
import { StepButtons } from "../../components/StepButtons"
import ComboboxInput from "../../components/inputs/ComboboxInput"
import TextInput from "../../components/inputs/TextInput"
import RadioInput from "../../components/inputs/RadioInput"
import TextareaInput from "../../components/inputs/TextareaInput"
import {
  Step,
  createSchemaFromFields,
  getFieldsFromStep,
  isCombo,
  isInput,
  isRadio,
  isText,
  isTextInput,
  isTextareaInput,
} from "../../utils/hackerapplication"

interface StepProps {
  step: Step
  isFirstStep: boolean
  isLastStep: boolean
  navForward: (data: any) => void
  navBackward: () => void
}

const RenderStep = ({
  step,
  isFirstStep,
  isLastStep,
  navForward,
  navBackward,
}: StepProps) => {
  // Get default form state
  const [appState] = useAppState()
  const defaultValues =
    appState && appState.demographics ? appState.demographics : {}

  // Construct Schema
  const fields = getFieldsFromStep(step)
  const StepSchema = createSchemaFromFields(AppDemographicsSchema, fields)
  type StepSchema = z.infer<typeof StepSchema>

  // Validation/state with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepSchema>({
    defaultValues,
    resolver: zodResolver(StepSchema),
  })

  // State for ComboboxInput queries
  const [state, setState] = useState({})

  return (
    <form onSubmit={handleSubmit(navForward)}>
      {step.map((block, i) => (
        <div key={i}>
          {block.map((blockElement, j) => {
            // Text
            if (isText(blockElement)) {
              return (
                <p key={"" + i + j} className='text-center font-subtext'>
                  {blockElement.text}
                </p>
              )
            }
            // Input
            if (isInput(blockElement)) {
              const error = (errors as any)[blockElement.field]
                ? ((errors as any)[blockElement.field]?.message as string)
                : undefined

              if (isTextInput(blockElement)) {
                const { field, Icon, additionalInputProps } = blockElement
                return (
                  <TextInput
                    key={"" + i + j}
                    Icon={Icon}
                    inputProps={{
                      ...register(
                        field as never,
                        // input type number
                        additionalInputProps &&
                          additionalInputProps.type === "number" && {
                            valueAsNumber: true,
                          }
                      ),
                      ...additionalInputProps,
                    }}
                    error={error}
                  />
                )
              }
              if (isCombo(blockElement)) {
                const { field, options } = blockElement
                return (
                  <ComboboxInput
                    key={"" + i + j}
                    query={state[field as keyof typeof state] || ""}
                    setQuery={val => setState({ ...state, [field]: val })}
                    name={field}
                    options={options}
                    control={control}
                    error={error}
                  />
                )
              }
              if (isRadio(blockElement)) {
                const { field, ...rest } = blockElement
                return (
                  <RadioInput
                    key={"" + i + j}
                    name={field}
                    control={control}
                    error={error}
                    {...rest}
                  />
                )
              }
              if (isTextareaInput(blockElement)) {
                const { field, ...rest } = blockElement
                return (
                  <TextareaInput
                    key={"textarea" + i + j}
                    inputProps={{ ...register(field as never) }}
                    error={error}
                    {...rest}
                  />
                )
              }

              throw new Error("Invalid form element")
            }
            // JSX
            if (isValidElement(blockElement)) {
              return blockElement
            }

            throw new Error("Invalid block")
          })}
        </div>
      ))}

      <StepButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        navBackward={navBackward}
      />
    </form>
  )
}

export default RenderStep
