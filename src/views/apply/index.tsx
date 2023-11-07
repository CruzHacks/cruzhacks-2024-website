import React, { useState } from "react"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../utils/string"
import { Switch } from "@headlessui/react"
import TextInput from "../../components/inputs/TextInput"
import ComboboxInput, {
  ComboboxItem,
} from "../../components/inputs/ComboboxInput"
import RadioInput from "../../components/inputs/RadioInput"
import TextareaInput from "../../components/inputs/TextareaInput"

const comboboxPeople = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Doug Perri" },
  { id: 3, name: "Monkey Circus" },
]

const radioOptions = [
  "Option 1",
  "This is Option 2",
  "An Option 3",
  "A possible Option 4",
  "Another Option 5",
  "Opt6",
]

const Apply = () => {
  const [error, setError] = useState(false)

  // Combobox Props
  const [comboboxQuery, setComboboxQuery] = useState("")
  const [comboboxSelectedItem, setComboboxSelectedItem] =
    useState<ComboboxItem | null>(null)

  // Radio Props
  const [radioSelectedItem1, setRadioSelectedItem1] = useState(radioOptions[0])
  const [radioSelectedItem2, setRadioSelectedItem2] = useState(radioOptions[0])
  const [radioSelectedItem3, setRadioSelectedItem3] = useState(radioOptions[0])

  return (
    <div className='flex flex-col items-center justify-center gap-10 p-20'>
      <h1 className='font-title text-4xl'>Apply</h1>
      <h2 className='font-title'>Sample inputs</h2>
      <div className='flex items-center justify-center gap-5 font-subtext'>
        <p>Error state toggle:</p>
        <Switch
          checked={error}
          onChange={setError}
          className={classNames(
            error ? "bg-error" : "bg-white/10",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2"
          )}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={classNames(
              error ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>

      <div className='max-w-md space-y-8'>
        <div>
          <h3 className='text-lg'>Text Input with Icon</h3>
          <TextInput
            Icon={EnvelopeIcon}
            inputProps={{
              type: "email",
              name: "email",
              id: "email",
              placeholder: "Email",
              "aria-invalid": "true",
              "aria-describedby": `email-error`,
            }}
            error={error ? "Not a valid email address." : undefined}
          />
        </div>

        <div>
          <h3 className='text-lg'>Text Input with Icon</h3>
          <TextInput
            inputProps={{
              type: "text",
              name: "full-name",
              id: "full-name",
              placeholder: "Full Name",
              "aria-describedby": "full-name-error",
            }}
            error={error ? "Not a valid name." : undefined}
          />
        </div>

        <div>
          <h3 className='text-lg'>Combobox</h3>
          <ComboboxInput
            items={comboboxPeople}
            query={comboboxQuery}
            setQuery={setComboboxQuery}
            selectedItem={comboboxSelectedItem}
            setSelectedItem={setComboboxSelectedItem}
            error={error ? "Not a valid person." : undefined}
          />
        </div>
      </div>

      <div className='w-full'>
        <h3 className='text-lg'>Radio Options</h3>
        <RadioInput
          items={radioOptions}
          selectedItem={radioSelectedItem1}
          setSelectedItem={setRadioSelectedItem1}
        />
      </div>

      <div className='w-full'>
        <h3 className='text-lg'>Radio Options w other</h3>
        <RadioInput
          items={radioOptions}
          selectedItem={radioSelectedItem2}
          setSelectedItem={setRadioSelectedItem2}
          other
        />
      </div>

      <div className='w-full'>
        <h3 className='text-lg'>Radio Options Wrap</h3>
        <RadioInput
          items={radioOptions}
          selectedItem={radioSelectedItem3}
          setSelectedItem={setRadioSelectedItem3}
          arrange='vertical-inline'
        />
      </div>

      <div className='w-full'>
        <h3 className='text-lg'>Short Answer no count</h3>
        <TextareaInput
          error={error ? "Not a valid answer." : undefined}
          showCount={false}
        />
      </div>

      <div className='w-full'>
        <h3 className='text-lg'>Short Answer tall</h3>
        <TextareaInput
          rows={12}
          error={error ? "Not a valid answer." : undefined}
        />
      </div>
    </div>
  )
}

export default Apply
