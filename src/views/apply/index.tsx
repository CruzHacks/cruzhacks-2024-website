import React, { ReactElement, useEffect, useState } from "react"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../utils/string"
import { Switch } from "@headlessui/react"
import TextInput from "../../components/inputs/TextInput"
import ComboboxInput, {
  ComboboxItem,
} from "../../components/inputs/ComboboxInput"
import RadioInput from "../../components/inputs/RadioInput"
import TextareaInput from "../../components/inputs/TextareaInput"
import { ApplicationSchema } from "../../utils/types"
import { submitApplicationUnauthed } from "../../utils/apis/cloudFunctions"
import toast from "react-hot-toast"
import ProgressBar from "../../components/ProgressBar"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { useForm } from "react-hook-form"

const app: ApplicationSchema = {
  email: `test${Math.floor(Math.random() * 100)}@gmail.com`,
  password: "password123",
  demographics: {
    first_name: "John",
    last_name: "Doe",
    phone_number: "" + Math.floor(Math.random() * 1000000000),
    age: 21,
    country: "United State of America",
    school: "University of California, Santa Cruz",
    year_in_school: "Junior",
    education_level: "Undergraduate",
    ucsc_student: true,
    ucsc_college_affiliation: "Crown",
    graduation_year: 2025,
    area_of_study: ["Computer Science"],
    first_hackathon: true,
    hackathon_experience: "2",
    tech_experience:
      "I have experience with React and Node.js. I have made a few different side projects creating API layers and simple dashboards.",
    ethnic_background: ["White", "Chinese"],
    pronouns: "He/Him",
    gender: "Male",
    sexual_orientation: "Straight",
    underepresented_group: "true",
  },
  short_responses: {
    responses: [
      {
        question: "Why do you want to attend CruzHacks?",
        answer:
          "I want to attend CruzHacks because I want to learn more about the tech industry and meet new people.",
      },
    ],
  },
  logistics: {
    need_travel_reimbursement: "I don't know",
    need_charter_bus: "I don't know",
    attendence_possible_wo_reimbursement: "Yes",
    need_campus_parking_permit: "Yes",
    travel_plan: "I will be driving to the event.",
    tshirt_size: "M",
    dietary_restrictions: "None",
  },
  socials: {
    resume_drop_form: false,
    linked_in: "https://www.linkedin.com/in/john-doe/",
    github: "https://github.com/johndoe",
    discord: "johndoe#1234",
    cruzhacks_referral: "From a friend",
    cruzhacks_refferal_email: "george@ucsc.edu",
  },
}

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

// {'Demographic': ['Welcome': ['Email', 'First Name', 'Last Name', 'Phone Number'], 'Password': ['Password', 'Confirm Password'], 'Demographic Information': ['Whats your age?', 'Where do you reside?', 'What school do you attend? Or most recently attended?']]}
// {}
interface comboboxProps {
  id: number,
  name: string,
}

interface questionProps {
  id: string,
  question: string,
  initText: string,
  icon: string,
  type: string,
  options: comboboxProps[],
}

interface sectionProps {
  progressStep: number, 
  header: string, 
  subtext: string, 
  questions: questionProps[]
}


const Apply = () => {
  const [error, setError] = useState(false)

  const handleApplicationSubmit = async () => {
    try {
      const message = await toast.promise(submitApplicationUnauthed(app), {
        loading: "Submitting application...",
        success: "Application submitted!",
        error: "Error submitting application",
      })
      console.log(message)
    } catch (err) {
      console.error(err)
    }
  }

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchema>({ resolver: zodResolver(ApplicationSchema) })

  // Combobox Props
  const [comboboxQuery, setComboboxQuery] = useState("")
  const [comboboxSelectedItem, setComboboxSelectedItem] =
    useState<ComboboxItem | null>(null)

  // Radio Props
  const [radioSelectedItem1, setRadioSelectedItem1] = useState(radioOptions[0])
  const [radioSelectedItem2, setRadioSelectedItem2] = useState(radioOptions[0])
  const [radioSelectedItem3, setRadioSelectedItem3] = useState(radioOptions[0])

  // Progress Bar Props
  const [activeStep, setActiveStep] = useState(0)
  const [page, setPage] = useState(0)
  const steps = ['Login', 'Demographics', 'Short Answer', 'Logistics', 'Socials', 'Waivers']

  const [sections, setSections] = useState(Array<sectionProps>)

  useEffect(() => {
    setSections([
      {'progressStep': 0, 'header': 'Welcome', 'subtext': 'We\'re so excited to have you! Let\'s get started with registration.', 'questions': 
        [
          {'id': 'email', 'question': '', 'initText': 'Email', 'icon': 'EnvelopeIcon', 'type': 'text', 'options': []},
          {'id': 'first_name', 'question': '', 'initText': 'First Name', 'icon': 'PeopleIcon', 'type': 'text', 'options': []},
          {'id': 'last_name', 'question': '', 'initText': 'Last Name', 'icon': '', 'type': 'text', 'options': []},
          {'id': 'phone_number', 'question': '', 'initText': 'Phone Number', 'icon': '', 'type': 'text', 'options': []},
        ]
      },
      {'progressStep': 0, 'header': 'Password', 'subtext': 'Set a password to be used to login to your portal.', 'questions': 
        [
          {'id': 'password', 'question': '', 'initText': 'Password', 'icon': 'LockIcon', 'type': 'text', 'options': []},
          {'id': 'password', 'question': '', 'initText': 'Confirm Password', 'icon': 'LockIcon', 'type': 'text', 'options': []},
        ]
      },
      {'progressStep': 1, 'header': 'Demographic Information', 'subtext': 'The information collected here will be used for statistical purposes only, in accordance with the MLH Privacy Policy (https://mlh.io/privacy).', 'questions': 
      [
        {'id': 'age', 'question': 'Whats your age?', 'initText': 'Age', 'icon': '', 'type': 'text', 'options': []},
        {'id': 'location', 'question': 'Where do you reside?', 'initText': 'Choose', 'icon': '', 'type': 'combobox', 'options': [{'id': 1, 'name': 'person1'}, {'id': 2, 'name': 'person2'}]},
        {'id': 'school', 'question': 'What school do you attend? Or most recently attended?', 'initText': 'Choose', 'icon': '', 'type': 'combobox', 'options': []},
      ]
    },
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'year', 'question': 'What year are you in?', 'initText': '', 'icon': '', 'type': 'radio', 'options': [{'id': 1, 'name': 'High School'}, {'id': 2, 'name': 'Freshman'}, {'id': 3, 'name': 'Sophmore'}, {'id': 4, 'name': 'Junior'}, {'id': 5, 'name': 'Senior'}, {'id': 6, 'name': 'Graduate'}]},
      ]
    }, 
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'year', 'question': 'In what type of educational institution are you currently enrolled in?', 'initText': '', 'icon': '', 'type': 'radio-wrap', 'options': [{'id': 1, 'name': 'Less than Secondary/High School'}, {'id': 2, 'name': 'Secondary/High School'}, {'id': 3, 'name': 'Undergraduate'}, {'id': 4, 'name': 'Community College'}, {'id': 5, 'name': 'Graduate'}, {'id': 6, 'name': 'Code School/Bootcamp'}, {'id': 7, 'name': 'Other Vocational/Trade Program or Apprenticeship'}, {'id': 8, 'name': 'Not currently a student'}, {'id': 9, 'name': 'Prefer not to answer'}, {'id': 10, 'name': 'Other'}]},
      ]
    },
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'firstTime', 'question': 'Will this be your first time attending CruzHacks?', 'initText': '', 'icon': '', 'type': 'combobox', 'options': []},
        {'id': 'firstTime', 'question': 'Have you attended any hackathons before? If so, how many?', 'initText': '', 'icon': '', 'type': 'combobox', 'options': []},
        {'id': 'firstTime', 'question': 'Do you have prior tech experience? If so, in what context (i.e. classes, internships, personal projects)?', 'initText': '', 'icon': '', 'type': 'short-answer', 'options': []},
      ]
    },
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'ucscCollege', 'question': 'UCSC College Affiliation', 'initText': '', 'icon': '', 'type': 'radio-wrap', 'options': [{'id': 1, 'name': 'College 9'}, {'id': 2, 'name': 'Oakes'}, {'id': 3, 'name': 'Rachel Carson'},{'id': 4, 'name': 'Kresge'}, {'id': 5, 'name': 'Cowell'}, {'id': 6, 'name': 'Stevenson'}, {'id': 7, 'name': 'Merrill'}, {'id': 8, 'name': 'Porter'}, {'id': 9, 'name': 'Crown'}, {'id': 10, 'name': 'John R. Lewis'}, {'id': 11, 'name': 'UCSC Graduate Student (No Affiliation)'}, {'id': 12, 'name': 'N/A (I do not attend UCSC)'},]},
      ]
    },
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'gradYear', 'question': 'What year will you graduate from your current school?', 'initText': '', 'icon': '', 'type': 'radio', 'options': [{'id': 1, 'name': '2023'}, {'id': 2, 'name': '2024'}, {'id': 3, 'name': '2025'},{'id': 4, 'name': '2026'}, {'id': 5, 'name': '2027'}, {'id': 6, 'name': '2028 and beyond'}]},
      ]
    },
    {'progressStep': 1, 'header': '', 'subtext': '', 'questions': 
      [
        {'id': 'major', 'question': 'What is your major/primary area of study? If you already graduated, what was your major/primary area of study?', 'initText': '', 'icon': '', 'type': 'combobox', 'options': []},
      ]
    },

    ])
  }, [])

  useEffect(() => {
    if (sections && sections[page] && sections[page].progressStep) {setActiveStep(sections[page].progressStep)}
  }, [page])
  



  const Question = ({id, question, initText, icon, type, options}: questionProps) => {
    let ikon;
    switch (icon) {
      case 'EnvelopeIcon':
        ikon = EnvelopeIcon
        break
      default:
        ikon = undefined
        break
    }
    if (type === 'text') {
      return (
        <div>
        <h3 className='text-lg pb-4 text-roboto'>{question}</h3>
        <TextInput
          Icon={ikon}
          inputProps={{
            type: id,
            name: id,
            id: id,
            placeholder: initText,
            "aria-invalid": "true",
            "aria-describedby": id+`-error`,
          }}
          error={error ? "Not a valid " + initText : undefined}
        />
        </div> 
      )    
    } else if (type === 'combobox') {
      return (
        <div>
          <h3 className='text-lg pb-4 text-roboto'>{question}</h3>
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
    } else if (type === 'radio-wrap') {
      const opt = []
      for (let i = 0; i < options.length; i++) {
        opt.push(options[i].name)
      }
      return (   
      <div className='w-full'>
        <h3 className='text-lg pb-4 text-roboto'>{question}</h3>
        <RadioInput
          items={opt}
          selectedItem={radioSelectedItem3}
          setSelectedItem={setRadioSelectedItem3}
          arrange='vertical-inline'
        />
      </div>
      )
    } else if (type === 'radio') {
      const opt = []
      for (let i = 0; i < options.length; i++) {
        opt.push(options[i].name)
      }
      return (
        <div className='w-full'>
        <h3 className='text-lg pb-4 text-roboto'>{question}</h3>
        <RadioInput
          items={opt}
          selectedItem={radioSelectedItem2}
          setSelectedItem={setRadioSelectedItem2}
        />
      </div>
      )
    } else if (type === 'radio-other') {
      const opt = []
      for (let i = 0; i < options.length; i++) {
        opt.push(options[i].name)
      }
      return (
        <div className='w-full'>
        <h3 className='text-lg pb-4 text-roboto'>{question}</h3>
        <RadioInput
          items={opt}
          selectedItem={radioSelectedItem2}
          setSelectedItem={setRadioSelectedItem2}
          other
        />
      </div>
      )
    }
      return (<></>)
    }

  

  return (
    <div className='flex flex-col items-center justify-center gap-10 p-20'>
      <h1 className='font-title text-4xl'>Apply</h1>
      <ProgressBar steps={steps} activeStep={activeStep} />

      <h2 className='font-title'>
        Test submit application and account creation
      </h2>
      <div className='w-full space-y-8'>
        <p className=''>Test Application:</p>
        <pre className='rounded-xl bg-white/20 p-5 text-xs'>
          {JSON.stringify(app, null, 2)}
        </pre>
        <button
          onClick={handleApplicationSubmit}
          className='bg-pink border-2 p-5'
        >
          Submit Test Application
        </button>
      </div>
      <h2 className='font-title'>Sample inputs</h2>
      <div className='font-subtext flex items-center justify-center gap-5'>
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

      <form onSubmit={handleSubmit(handleApplicationSubmit)} className='w-full space-y-6'>
            <div className='flex w-full flex-col items-center justify-center gap-5 border-2 border-[#FFF]'>

              {sections.map((section, i) => (
                  <div key={i} className={(i !== page ? "hidden" : "flex w-full flex-col items-center justify-center")}>
                      <h3 className='text-4xl w-2/3 text-center font-title text-[#D3DAF4] pt-4 pb-4'>{section.header}</h3>
                      <h6 className='text-sm w-2/3 text-center font-body text-[#D3DAF4] pb-4'>{section.subtext}</h6>
                      <div className="flex h-auto w-full flex-col items-center justify-center gap-5">
                          {section.questions.map((q, i) => (
                            <div key={i} className="w-2/3 text-center font-roboto text-[#FFF]">
                              <Question id={q.id} question={q.question} initText={q.initText} icon={q.icon} type={q.type} options={q.options} />
                            </div>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
        
        {/* <div>
              <h3 className='text-lg'>What year will you graduate from your current school?</h3>
              <ComboboxInput
                items={comboboxPeople}
                query={comboboxQuery}
                setQuery={setComboboxQuery}
                selectedItem={comboboxSelectedItem}
                setSelectedItem={setComboboxSelectedItem}
                error={error ? "Not a valid choice." : undefined}
              />
            </div>

            
            <div>
              <h3 className='text-lg'>What is your major/primary area of study? If you already graduated, what was your major/primary area of study?</h3>
              <ComboboxInput
                items={comboboxPeople}
                query={comboboxQuery}
                setQuery={setComboboxQuery}
                selectedItem={comboboxSelectedItem}
                setSelectedItem={setComboboxSelectedItem}
                error={error ? "Not a valid choice." : undefined}
              />
            </div>

            <div className='w-full'>
            <h3 className='text-lg'>Which of the following best describes you?</h3>
            <RadioInput
              items={radioOptions}
              selectedItem={radioSelectedItem3}
              setSelectedItem={setRadioSelectedItem3}
              arrange='vertical-inline'
            />
          </div>

          <div className='w-full'>
          <h3 className='text-lg'>Pronouns</h3>
          <h6 className='text-md'>Select all that apply</h6>
          <RadioInput
            items={radioOptions}
            selectedItem={radioSelectedItem2}
            setSelectedItem={setRadioSelectedItem2}
            other
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>Do you identify as part of an underrepresented group in the technology industry?</h3>
          <RadioInput
            items={radioOptions}
            selectedItem={radioSelectedItem1}
            setSelectedItem={setRadioSelectedItem1}
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>What is your gender?</h3>
          <h6 className='text-md'>Select as many as you{'\''}d like</h6>
          <RadioInput
            items={radioOptions}
            selectedItem={radioSelectedItem1}
            setSelectedItem={setRadioSelectedItem1}
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>Do you consider yourself any of the following?</h3>
          <RadioInput
            items={radioOptions}
            selectedItem={radioSelectedItem1}
            setSelectedItem={setRadioSelectedItem1}
            other
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>Why do you want to attend CruzHacks</h3>
          <TextareaInput
            rows={12}
            error={error ? "Not a valid answer." : undefined}
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>What would you like to see at CruzHacks this year?</h3>
          <TextareaInput
            rows={12}
            error={error ? "Not a valid answer." : undefined}
          />
        </div>


        <div className='w-full'>
          <h3 className='text-lg'>Excluding all outside factors (money, technology development, etc), what is the grandest invention you would want to create or see?</h3>
          <TextareaInput
            rows={12}
            error={error ? "Not a valid answer." : undefined}
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>If you could go back in time, what invention would you like to witness being created?</h3>
          <TextareaInput
            error={error ? "Not a valid answer." : undefined}
            showCount={false}
          />
        </div>

        <div className='w-full'>
          <h3 className='text-lg'>You have one plane ticket to go anywhere in the world. Where would you go and why?</h3>
          <TextareaInput
            error={error ? "Not a valid answer." : undefined}
            showCount={false}
          />
        </div> */}


  

              <div>
              <div className="flex w-full flex-row justify-between px-10 py-5">
                <button className="h-12 w-24 rounded-md border-2 border-[#D9D9D9] bg-[#1C39C3]" onClick={() => setPage(page-1)}>
                <p className="font-roboto text-[#D9D9D9]"> {'<'} Back </p>
                </button>
                <button
                  className="h-12 w-24 rounded-md border-2 border-[#1C39C3] bg-[#D9D9D9]" onClick={() => setPage(page+1)}
                  type='submit'
                >
                  {loading ? (
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='fill-gray-200 text-gray-200 dark:text-green-800 mr-2 h-6 w-6 animate-spin'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  ) : (
                    <p className="font-roboto text-[#1C39C3]">Next {'>'}</p>
                  )}
                </button>
                </div>
              </div>
            </form>

      

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
