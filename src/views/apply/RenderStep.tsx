import React, { ReactElement, isValidElement, useState } from "react"
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

type Text = {
  text: string
  type?: "title" | "subtitle" | "body" // default: body
}

type TextInput = {
  inputType: "text"
  field: string
  additionalInputProps?: any
}

type TextareaInput = {
  inputType: "textarea"

  rows?: number
  showCount?: boolean
  maxLength?: number

  field: string
}

type RadioInput = {
  inputType: "radio"

  options: string[]
  other?: boolean
  arrange?: "vertical" | "vertical-inline"

  field: string
}

type ComboboxInput = {
  inputType: "combo"
  field: string
  options: string[]
}

type FormInput = TextInput | TextareaInput | RadioInput | ComboboxInput

type BlockElement = Text | FormInput | ReactElement<any, any>

type Block = BlockElement[]

export type Step = Block[]

const isText = (block: BlockElement): block is Text => {
  return (block as any as Text).text !== undefined
}

const isInput = (block: BlockElement): block is FormInput => {
  return (block as any as FormInput).inputType !== undefined
}

const isTextInput = (block: BlockElement): block is TextInput => {
  return isInput(block) && block.inputType == "text"
}

const isTextareaInput = (block: BlockElement): block is TextareaInput => {
  return isInput(block) && block.inputType == "textarea"
}

const isRadio = (block: BlockElement): block is RadioInput => {
  return isInput(block) && block.inputType == "radio"
}

const isCombo = (block: BlockElement): block is ComboboxInput => {
  return isInput(block) && block.inputType == "combo"
}

const getFieldsFromStep = (step: Step) => {
  const fields = []

  for (const block of step) {
    for (const blockElement of block) {
      if (isInput(blockElement)) {
        fields.push(blockElement.field)
      }
    }
  }

  return fields
}

const createSchemaFromFields = (
  sectionSchema: z.AnyZodObject,
  fields: string[]
) => {
  const stepSchema = fields.reduce((acc, field) => {
    if (!(field in sectionSchema.shape))
      throw new Error("Could not construct step schema: invalid field" + field)

    return {
      ...acc,
      [field]: sectionSchema.shape[field as keyof typeof sectionSchema],
    }
  }, {})

  return z.object(stepSchema)
}

export interface StepProps {
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepSchema>({
    defaultValues,
    resolver: zodResolver(StepSchema),
  })

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
                const { field, additionalInputProps } = blockElement
                return (
                  <TextInput
                    key={"" + i + j}
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
