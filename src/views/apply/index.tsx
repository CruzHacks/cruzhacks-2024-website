import React, { useEffect, useState } from "react"
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroIcons/react/24/outline"
import TextInput, { Icon } from "../../components/inputs/TextInput"
import ComboboxInput, {
  ComboboxItem,
} from "../../components/inputs/ComboboxInput"
import RadioInput from "../../components/inputs/RadioInput"
import { ApplicationSchema } from "../../utils/types"
import ProgressBar from "../../components/ProgressBar"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

const sections: Section[] = [
  {
    progressStep: 0,
    header: "Welcome",
    subtext:
      "We're so excited to have you! Let's get started with registration.",
    questions: [
      {
        id: "email",
        initText: "Email",
        Icon: EnvelopeIcon,
        type: "text",
      },
      {
        id: "first_name",
        initText: "First Name",
        Icon: UserIcon,
        type: "text",
      },
      {
        id: "last_name",
        initText: "Last Name",
        type: "text",
      },
      {
        id: "phone_number",
        initText: "Phone Number",
        type: "text",
      },
    ],
  },
  {
    progressStep: 0,
    header: "Password",
    subtext: "Set a password to be used to login to your portal.",
    questions: [
      {
        id: "password",
        question: "",
        initText: "Password",
        Icon: LockClosedIcon,
        type: "text",
      },
      {
        id: "password",
        question: "",
        initText: "Confirm Password",
        Icon: LockClosedIcon,
        type: "text",
      },
    ],
  },
  {
    progressStep: 1,
    header: "Demographic Information",
    subtext:
      "The information collected here will be used for statistical purposes only, in accordance with the MLH Privacy Policy (https://mlh.io/privacy).",
    questions: [
      {
        id: "age",
        question: "Whats your age?",
        initText: "Age",
        type: "text",
      },
      {
        id: "location",
        question: "Where do you reside?",
        initText: "Choose",
        type: "combobox",
        options: [
          { id: 1, name: "person1" },
          { id: 2, name: "person2" },
        ],
      },
      {
        id: "school",
        question: "What school do you attend? Or most recently attended?",
        initText: "Choose",
        type: "combobox",
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "year",
        question: "What year are you in?",
        initText: "",
        type: "radio",
        options: [
          { id: 1, name: "High School" },
          { id: 2, name: "Freshman" },
          { id: 3, name: "Sophmore" },
          { id: 4, name: "Junior" },
          { id: 5, name: "Senior" },
          { id: 6, name: "Graduate" },
        ],
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "year",
        question:
          "In what type of educational institution are you currently enrolled in?",
        type: "radio-wrap",
        options: [
          { id: 1, name: "Less than Secondary/High School" },
          { id: 2, name: "Secondary/High School" },
          { id: 3, name: "Undergraduate" },
          { id: 4, name: "Community College" },
          { id: 5, name: "Graduate" },
          { id: 6, name: "Code School/Bootcamp" },
          {
            id: 7,
            name: "Other Vocational/Trade Program or Apprenticeship",
          },
          { id: 8, name: "Not currently a student" },
          { id: 9, name: "Prefer not to answer" },
          { id: 10, name: "Other" },
        ],
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "firstTime",
        question: "Will this be your first time attending CruzHacks?",
        type: "combobox",
        options: [],
      },
      {
        id: "firstTime",
        question: "Have you attended any hackathons before? If so, how many?",
        type: "combobox",
        options: [],
      },
      {
        id: "firstTime",
        question:
          "Do you have prior tech experience? If so, in what context (i.e. classes, internships, personal projects)?",
        type: "short-answer",
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "ucscCollege",
        question: "UCSC College Affiliation",
        initText: "",

        type: "radio-wrap",
        options: [
          { id: 1, name: "College 9" },
          { id: 2, name: "Oakes" },
          { id: 3, name: "Rachel Carson" },
          { id: 4, name: "Kresge" },
          { id: 5, name: "Cowell" },
          { id: 6, name: "Stevenson" },
          { id: 7, name: "Merrill" },
          { id: 8, name: "Porter" },
          { id: 9, name: "Crown" },
          { id: 10, name: "John R. Lewis" },
          { id: 11, name: "UCSC Graduate Student (No Affiliation)" },
          { id: 12, name: "N/A (I do not attend UCSC)" },
        ],
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "gradYear",
        question: "What year will you graduate from your current school?",
        type: "radio",
        options: [
          { id: 1, name: "2023" },
          { id: 2, name: "2024" },
          { id: 3, name: "2025" },
          { id: 4, name: "2026" },
          { id: 5, name: "2027" },
          { id: 6, name: "2028 and beyond" },
        ],
      },
    ],
  },
  {
    progressStep: 1,
    questions: [
      {
        id: "major",
        question:
          "What is your major/primary area of study? If you already graduated, what was your major/primary area of study?",
        initText: "",
        type: "combobox",
        options: [],
      },
    ],
  },
]

interface QuestionProps {
  id: string
  question?: string
  initText?: string
  Icon?: Icon
  type: string
  options?: { id: number; name: string }[]
}

type Section = {
  progressStep: number
  header?: string
  subtext?: string
  questions: QuestionProps[]
}

const Apply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchema>({ resolver: zodResolver(ApplicationSchema) })
  const [radioSelectedItem, setRadioSelectedItem] = useState<string>("")

  const handleApplicationSubmit: SubmitHandler<
    ApplicationSchema
  > = async data => {
    console.log(data)
  }

  const error = undefined

  // Combobox Props
  const [comboboxQuery, setComboboxQuery] = useState("")
  const [comboboxSelectedItem, setComboboxSelectedItem] =
    useState<ComboboxItem | null>(null)

  // Progress Bar Props
  const [activeStep, setActiveStep] = useState(0)
  const [page, setPage] = useState(0)
  const steps = [
    "Login",
    "Demographics",
    "Short Answer",
    "Logistics",
    "Socials",
    "Waivers",
  ]

  useEffect(() => {
    if (sections && sections[page] && sections[page].progressStep) {
      setActiveStep(sections[page].progressStep)
    }
  }, [page])

  const Question = ({
    id,
    question,
    initText,
    Icon,
    type,
    options,
  }: QuestionProps) => {
    if (type === "text") {
      return (
        <div>
          <h3 className='text-roboto pb-4 text-lg'>{question}</h3>
          <TextInput
            Icon={Icon}
            inputProps={{
              type: id,
              name: id,
              id: id,
              placeholder: initText,
              "aria-invalid": "true",
              "aria-describedby": id + `-error`,
            }}
            error={error ? "Not a valid " + initText : undefined}
          />
        </div>
      )
    } else if (type === "combobox") {
      if (!options)
        return <p className='text-error'>rendering error for {type} question</p>

      return (
        <div>
          <h3 className='text-roboto pb-4 text-lg'>{question}</h3>
          <ComboboxInput
            items={options}
            query={comboboxQuery}
            setQuery={setComboboxQuery}
            selectedItem={comboboxSelectedItem}
            setSelectedItem={setComboboxSelectedItem}
            error={error ? "Not a valid choice." : undefined}
          />
        </div>
      )
    } else if (type === "radio-wrap") {
      if (!options)
        return <p className='text-error'>rendering error for {type} question</p>

      const opt = options.map(o => o.name)
      return (
        <div className='w-full'>
          <h3 className='text-roboto pb-4 text-lg'>{question}</h3>
          <RadioInput
            items={opt}
            selectedItem={radioSelectedItem}
            setSelectedItem={setRadioSelectedItem}
            arrange='vertical-inline'
          />
        </div>
      )
    } else if (type === "radio") {
      if (!options)
        return <p className='text-error'>rendering error for {type} question</p>

      const opt = options.map(o => o.name)
      return (
        <div className='w-full'>
          <h3 className='text-roboto pb-4 text-lg'>{question}</h3>
          <RadioInput
            items={opt}
            selectedItem={radioSelectedItem}
            setSelectedItem={setRadioSelectedItem}
          />
        </div>
      )
    } else if (type === "radio-other") {
      if (!options)
        return <p className='text-error'>rendering error for {type} question</p>

      const opt = options.map(o => o.name)
      return (
        <div className='w-full'>
          <h3 className='text-roboto pb-4 text-lg'>{question}</h3>
          <RadioInput
            items={opt}
            selectedItem={radioSelectedItem}
            setSelectedItem={setRadioSelectedItem}
            other
          />
        </div>
      )
    }
    return <></>
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 p-20'>
      <ProgressBar steps={steps} activeStep={activeStep} />

      <form
        onSubmit={handleSubmit(handleApplicationSubmit)}
        className='w-full space-y-6'
      >
        <div className='flex w-full flex-col items-center justify-center gap-5'>
          {sections.map((section, i) => (
            <div
              key={i}
              className={
                i !== page
                  ? "hidden"
                  : "flex w-full flex-col items-center justify-center"
              }
            >
              <h3 className='w-2/3 py-4 text-center font-title text-4xl text-[#D3DAF4]'>
                {section.header}
              </h3>
              <h6 className='w-2/3 pb-4 text-center font-body text-sm text-[#D3DAF4]'>
                {section.subtext}
              </h6>
              <div className='flex h-auto w-full flex-col items-center justify-center gap-5'>
                {section.questions.map((q, i) => (
                  <div
                    key={i}
                    className='w-2/3 text-center font-roboto text-[#FFF]'
                  >
                    <Question
                      id={q.id}
                      question={q.question}
                      initText={q.initText}
                      Icon={q.Icon}
                      type={q.type}
                      options={q.options}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className='flex w-full flex-row justify-between px-10 py-5'>
            <button
              className='h-12 w-24 rounded-md border-2 border-[#D9D9D9] bg-[#1C39C3]'
              onClick={() => {
                if (page > 0) setPage(page - 1)
              }}
            >
              <p className='font-roboto text-[#D9D9D9]'> {"<"} Back </p>
            </button>
            <button
              className='h-12 w-24 rounded-md border-2 border-[#1C39C3] bg-[#D9D9D9]'
              onClick={() => {
                if (page < sections.length - 1) setPage(page + 1)
              }}
              type='submit'
            >
              <p className='font-roboto text-[#1C39C3]'>Next {">"}</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Apply
