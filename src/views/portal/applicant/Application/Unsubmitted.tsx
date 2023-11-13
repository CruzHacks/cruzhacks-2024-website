import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { classNames } from "../../../../utils/string"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { submitApplicationAuthed } from "../../../../utils/apis/cloudFunctions"
import useAuth from "../../../../hooks/useAuth"
import { ApplicationSchemaDto } from "../../../../utils/types"

const app: ApplicationSchemaDto = {
  user: {
    email: "",
    password: "",
    first_name: "John",
    last_name: "Doe",
    phone_number: "1231231234",
  },
  demographics: {
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

// This component uses react-hook-form to handle data validation and input
// specific errors. Follow this tutorial to learn more about how Zod is used in
// react-hook-form to validate the schema:
// https://react-hook-form.com/get-started#SchemaValidation
const Unsubmitted = () => {
  const {
    auth: { user },
  } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchemaDto>({
    resolver: zodResolver(ApplicationSchemaDto),
  })

  const handleApplicationSubmit: SubmitHandler<
    ApplicationSchemaDto
  > = async () => {
    if (!user) {
      setError("User not logged in")
      return
    }

    setLoading(true)
    // const { message } = await submitApplication({ user, application: data })
    // alert(message)
  }

  const testSubmitApplication = async () => {
    if (!user) {
      console.error("User not logged in")
      return
    }

    try {
      const message = await submitApplicationAuthed(user, app)
      console.log(message)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className=''>
      <button onClick={testSubmitApplication} className='border-2 bg-pink p-5'>
        Test Submit Application
      </button>
      <form
        onSubmit={handleSubmit(handleApplicationSubmit)}
        className='space-y-6'
      >
        <div>
          <label
            htmlFor='first_name'
            className='text-gray-900 block text-sm font-medium leading-6'
          >
            First Name
          </label>
          <div className='relative mt-2 rounded-md shadow-sm'>
            <input
              type='text'
              {...register("user.first_name")}
              name='first_name'
              id='first_name'
              className={classNames(
                errors.user?.first_name
                  ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"
                  : "",
                "ring-gray-300 placeholder:text-gray-400 focus:ring-green-800 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              )}
              placeholder='you@example.com'
              aria-invalid={errors.user?.first_name ? "true" : "false"}
              aria-describedby='password-error'
            />
            {errors.user?.first_name && (
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                <ExclamationCircleIcon
                  className='text-red-500 h-5 w-5'
                  aria-hidden='true'
                />
              </div>
            )}
          </div>

          {errors.user?.first_name && (
            <p className='text-red-600 mt-2 text-sm' id='email-error'>
              {errors.user.first_name.message}
            </p>
          )}
        </div>

        <div>
          <button
            type='submit'
            className='bg-green-800 hover:bg-green-700 focus-visible:outline-green-800 disabled:bg-gray-500 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
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
              <span>Submit Application</span>
            )}
          </button>
        </div>
      </form>

      <div>
        {error && <span className='text-rose-500 mt-10 text-xs'>{error}</span>}
      </div>
    </div>
  )
}

export default Unsubmitted
