import React from "react"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid"
import { classNames } from "../../utils/string"

export type ComboboxItem = {
  id: number
  name: string
}

interface ComboboxInputProps {
  query: string
  setQuery: (query: string) => void
  items: ComboboxItem[]
  selectedItem: ComboboxItem | null
  setSelectedItem: (item: ComboboxItem) => void
  error?: string
}

const ComboboxInput = ({
  query,
  setQuery,
  items,
  selectedItem,
  setSelectedItem,
  error,
}: ComboboxInputProps) => {
  const filteredItems =
    query === ""
      ? items
      : items.filter(item => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <>
      <Combobox as='div' value={selectedItem} onChange={setSelectedItem}>
        <div className='relative mt-2'>
          <Combobox.Input
            className={classNames(
              error
                ? "bg-error/10 text-error ring-error/10 focus:ring-error/50"
                : "bg-white/10 text-white ring-white/5 focus:ring-white/40",
              "w-full rounded-md border-0 py-5 pl-3 pr-10 text-center font-subtext shadow-sm ring ring-inset focus:ring sm:text-lg sm:leading-6"
            )}
            onChange={event => setQuery(event.target.value)}
            displayValue={(item: ComboboxItem) => item?.name}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
            <ChevronUpDownIcon
              className={classNames(
                error ? "text-error" : "text-white",
                "h-7 w-7"
              )}
              aria-hidden='true'
            />
          </Combobox.Button>

          {filteredItems.length > 0 && (
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-imperial py-1 shadow-lg ring-1 ring-white/5 focus:outline-none sm:text-sm'>
              {filteredItems.map(person => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-blue-royal/60 text-white" : "text-white/80"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          selected && "text-pink",
                          "block truncate font-subtext"
                        )}
                      >
                        {person.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            selected && "text-pink",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {error && <p className='mt-2 text-sm text-error'>{error}</p>}
    </>
  )
}

export default ComboboxInput
