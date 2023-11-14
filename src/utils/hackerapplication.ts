import { ReactElement } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { HeroIcon } from "./types"

/**
 * Utility types for the Hacker Application.
 */

type Text = {
  text: string
  type?: "title" | "subtitle" | "body" // default: body
}

type TextInput = {
  inputType: "text"
  field: string
  Icon?: HeroIcon
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

/**
 * Check if a block element is text.
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is text
 */
export const isText = (blockElement: BlockElement): blockElement is Text => {
  return (blockElement as any as Text).text !== undefined
}

/**
 * Check if a block element is an input
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is an input
 */
export const isInput = (
  blockElement: BlockElement
): blockElement is FormInput => {
  return (blockElement as any as FormInput).inputType !== undefined
}

/**
 * Check if a block element is a text input
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is a text input
 */
export const isTextInput = (
  blockElement: BlockElement
): blockElement is TextInput => {
  return isInput(blockElement) && blockElement.inputType == "text"
}

/**
 * Check if a block element is a textarea input
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is a textarea input
 */
export const isTextareaInput = (
  blockElement: BlockElement
): blockElement is TextareaInput => {
  return isInput(blockElement) && blockElement.inputType == "textarea"
}

/**
 * Check if a block element is a radio input
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is a radio input
 */
export const isRadio = (
  blockElement: BlockElement
): blockElement is RadioInput => {
  return isInput(blockElement) && blockElement.inputType == "radio"
}

/**
 * Check if a block element is a combobox input
 * @param blockElement a block is an array of block elements (text, input, jsx)
 * @returns true if the block element is a combobox input
 */
export const isCombo = (
  blockElement: BlockElement
): blockElement is ComboboxInput => {
  return isInput(blockElement) && blockElement.inputType == "combo"
}

/**
 * Get the Hacker Application field name from a given step
 * @param step a Hacker Application section step
 * @returns an array of field names from the step
 */
export const getFieldsFromStep = (step: Step) => {
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

/**
 * Creates an object schema from a list of fields and a section schema
 * @param sectionSchema a zod schema for a Hacker Application section to pull validation from
 * @param fields feilds to include in the schema
 * @returns a zod object schema with only the fields specified
 */
export const createSchemaFromFields = (
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

/**
 * Merge data into the app state for a given section
 * @param section a Hacker Application section
 * @param data data to merge into the app state
 * @param appState the global state of the Hacker Application (fields)
 * @returns the new app state with the data merged into the section
 */
export const mergeAppState = (section: string, data: any, appState: any) => {
  const sectionData =
    appState && appState[section]
      ? { [section]: { ...appState[section], ...data } }
      : { [section]: data }

  return { ...appState, ...sectionData }
}

/**
 * Notify the user of validation errors using react-hot-toast
 * @param err an error object
 * @returns nothing, but displays a toast with the error messages
 */
export const notifyValidationErrors = (err: any) => {
  console.error(err)
  if (err instanceof z.ZodError) {
    err.issues.forEach(issue => {
      toast.error(
        issue.message === "Required"
          ? `Field "${issue.path}" is required.`
          : issue.message
      )
    })
    return
  }
  if (err instanceof Error) {
    toast.error(JSON.stringify(err.message))
    return
  }
  toast.error(JSON.stringify(err))
}
