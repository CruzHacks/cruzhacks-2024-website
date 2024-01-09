import React from "react"
import { ApplicationSchemaDto, ReChartsArray } from "../../../../utils/types"
import { submitApplicationUnauthed } from "../../../../utils/apis/cloudFunctions"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
} from "recharts"
import useStatistics from "../../../../hooks/useStatistics"

const otherFields = {
  short_response: {
    why_cruzhacks: "",
    what_would_you_like_to_see: "",
    grand_invention: "",
    back_in_time_invention: "",
    one_plane_ticket_anywhere: "",
  },
  logistics: {
    need_travel_reimbursement: "",
    need_charter_bus: "",
    attendence_possible_wo_reimbursement: "",
    need_campus_parking_permit: "",
    travel_plan: "",
    tshirt_size: "M",
    dietary_restrictions: "none",
  },
  socials: {
    resume_drop_form: "No",
    linkedin: "",
    github: "",
    discord: "",
    cruzhacks_referral: "",
    cruzhacks_refferal_email: "",
    cruzhacks_refferal_organization: "",
    anything_else: "",
  },
}

const SampleApp1: ApplicationSchemaDto = {
  user: {
    email: "email1test@gmail.com",
    first_name: "Zack",
    last_name: "Traczyk",
    phone_number: "7085228604",
    password: "ginger98",
  },
  demographics: {
    age: 19,
    country: "United States",
    school: "University of California, Santa Cruz",
    ucsc_college_affiliation: "Porter",
    year_in_school: "Freshman",
    education_level: "undergaduate",
    graduation_year: "2024",
    area_of_study: "Computer and Information Sciences",
    first_cruzhacks: "Yes, this is my first CruzHacks",
    hackathon_experience: "0 / No",
    ethnic_background: "White",
    gender_identity_one: "Cisgender",
    gender_identity_two: "Man",
    sexual_orientation: "Gay or Lesbian",
    underepresented_group: "No",

    tech_experience: "I do not have any tech experience", // DO NOT INCLUDE IN STATS
    pronouns: "he/him", // DO NOT INCLUDE IN STATS
  },
  ...otherFields,
}

const SampleApp2: ApplicationSchemaDto = {
  user: {
    email: "email2test@gmail.com",
    first_name: "Zack",
    last_name: "Traczyk",
    phone_number: "7085228605",
    password: "ginger98",
  },
  demographics: {
    age: 18,
    country: "United States",
    school: "University of California, Santa Cruz",
    ucsc_college_affiliation: "Cowell",
    year_in_school: "Senior",
    education_level: "graduate",
    graduation_year: "2025",
    area_of_study: "Biology",
    first_cruzhacks: "No, this is not my first CruzHacks",
    hackathon_experience: "3",
    ethnic_background: "Asian Indian",
    gender_identity_one: "Transgender",
    gender_identity_two: "Woman",
    sexual_orientation: "Queer",
    underepresented_group: "Yes",

    tech_experience: "I do not have any tech experience", // DO NOT INCLUDE IN STATS
    pronouns: "he/him", // DO NOT INCLUDE IN STATS
  },
  ...otherFields,
}

const SampleApp3: ApplicationSchemaDto = {
  user: {
    email: "email3test@gmail.com",
    first_name: "Zack",
    last_name: "Traczyk",
    phone_number: "7085228606",
    password: "ginger98",
  },
  demographics: {
    age: 18,
    country: "United States",
    school: "University of Wisconsin, Madison",
    ucsc_college_affiliation: "N/A (I don't attend UCSC)",
    year_in_school: "Freshman",
    education_level: "undergaduate",
    graduation_year: "2027",
    area_of_study: "Computer and Information Sciences",
    first_cruzhacks: "Yes, this is my first CruzHacks",
    hackathon_experience: "2",
    ethnic_background: "Black/African",
    gender_identity_one: "Cisgender",
    gender_identity_two: "Man",
    sexual_orientation: "Gay or Lesbian",
    underepresented_group: "No",

    tech_experience: "I do not have any tech experience", // DO NOT INCLUDE IN STATS
    pronouns: "he/him", // DO NOT INCLUDE IN STATS
  },
  ...otherFields,
}

const SampleApp4: ApplicationSchemaDto = {
  user: {
    email: "email4test@gmail.com",
    first_name: "Zack",
    last_name: "Traczyk",
    phone_number: "7085228607",
    password: "ginger98",
  },
  demographics: {
    age: 21,
    country: "Canada",
    school: "Unviersity of California, Berkeley",
    ucsc_college_affiliation: "N/A (I don't attend UCSC)",
    year_in_school: "I am not currently in school",
    education_level: "N/A",
    graduation_year: "N/A",
    area_of_study: "Computer Engineering",
    first_cruzhacks: "No, this is not my first CruzHacks",
    hackathon_experience: "2",
    ethnic_background: "White",
    gender_identity_one: "Nonbinary",
    gender_identity_two: "Nonbinary",
    sexual_orientation: "Asexual",
    underepresented_group: "Yes",

    tech_experience: "I do not have any tech experience", // DO NOT INCLUDE IN STATS
    pronouns: "he/him", // DO NOT INCLUDE IN STATS
  },
  ...otherFields,
}

const submitSampleApps = async () => {
  try {
    await submitApplicationUnauthed(SampleApp1)
    await submitApplicationUnauthed(SampleApp2)
    await submitApplicationUnauthed(SampleApp3)
    await submitApplicationUnauthed(SampleApp4)
  } catch (err) {
    console.error(err)
  }
}

const COLORS = [
  "#E558F4", // Pink
  "#13E4CA", // Turquoise
  "#5B1FED", // Purple-Han
  "#F9A318", // Orange
  "#1795EB", // Blue-Button
  "#F9D318", // Gold
]

const statisticKeyToTitle = (statisticKey: string) => {
  return statisticKey.replace(/_/g, " ")
}

const rechartsArrayToPieChartData = (
  rechartsArray: ReChartsArray
): ReChartsArray => {
  const total = rechartsArray.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.value),
    0
  )

  return rechartsArray.map(rechartsObject => {
    console.log(rechartsObject.value, rechartsArray.length)
    return {
      name: rechartsObject.name,
      value: Number(rechartsObject.value) / total,
    }
  })
}

const DashboardAdmin = () => {
  const { isError, isLoading, error, data: statistics } = useStatistics()

  return (
    <div className='flex flex-col'>
      <h1 className='font-title text-xl'>Dashboard</h1>

      {/* TEMP */}
      <button
        type='button'
        onClick={() => submitSampleApps()}
        className='mt-3 rounded-md bg-blue-button/10 p-3 font-bold'
      >
        Create sample apps
      </button>

      {isLoading && (
        <div className='flex h-60 justify-center'>
          <div
            role='status'
            className='flex w-full items-center justify-center'
          >
            <svg
              aria-hidden='true'
              className='h-20 w-20 animate-spin fill-white text-blue-imperial/30'
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
        </div>
      )}

      {isError && (
        <div className='flex min-h-full w-full flex-col items-center justify-center p-10'>
          <p className='font-subtext leading-8 text-error'>
            Error while fetching statistics:
          </p>
          <p className='break-all font-subtext leading-8 text-error'>
            {error.message}
          </p>
        </div>
      )}

      {!isError && !isLoading && statistics && (
        <div className='space-y-10'>
          <h2 className='font-title text-lg'>Demographics</h2>
          <div className='space-y-5'>
            <div className='flex w-full flex-wrap justify-center gap-10 '>
              <FormattedPieChart
                data={statistics?.demographics?.age}
                title='Age Groups'
                label='years old'
              />
              <FormattedPieChart
                data={statistics?.demographics?.age_range_18_to_25}
                title='Ages 18 - 25 Breakdown'
                label='years old'
              />
            </div>
            <div className='flex w-full flex-wrap justify-center gap-10'>
              <FormattedPieChart
                data={statistics.demographics.sexual_orientation}
                title='Sexual Orientation'
              />
              <div className='flex flex-col items-center'>
                <h3 className='font-title capitalize'>Gender Expression</h3>
                <div className='flex gap-10'>
                  <FormattedPieChart
                    data={statistics.demographics.gender_identity_one}
                  />
                  <FormattedPieChart
                    data={statistics.demographics.gender_identity_two}
                  />
                </div>
              </div>
            </div>
            <BarChart
              width={700}
              height={200}
              data={statistics.demographics.ethnic_background}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip content={BarCustomTooltip} cursor={false} />
              <Legend verticalAlign='bottom' height={2} />
              <XAxis dataKey='name' />
              <Bar dataKey='value' fill={COLORS[0]} />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  )
}

const FormattedPieChart = ({
  data,
  title,
  label,
}: {
  data: ReChartsArray
  title?: string
  label?: string
}) => {
  if (!data) {
    return (
      <div className='flex h-[400px] w-[400px] items-center justify-center bg-error/10'>
        <p className='text-center text-error'>No Data provided for {title}</p>
      </div>
    )
  }
  const pieChartData = rechartsArrayToPieChartData(data)

  console.log(pieChartData)

  return (
    <div className='text-md flex flex-col items-center'>
      {title && <h3 className='font-title capitalize'>{title}</h3>}
      <PieChart width={450} height={300} className='text-white'>
        <Tooltip
          content={data => <PieCustomTooltip {...data} label={label} />}
        />
        {/* <Legend verticalAlign='bottom' height={2} /> */}
        <Pie
          type='monotone'
          data={pieChartData}
          dataKey='value'
          name='name'
          stroke='none'
          innerRadius={60}
          outerRadius={80}
          // paddingAngle={2}
          label={entry => entry.name}
        >
          {data.map((_, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

const BarCustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className='rounded-md border-white/50 bg-blue-royal p-2'>
      <p className='font-subtext text-white'>{`${payload[0].value}
      ${label ? " " + label : ""}`}</p>
    </div>
  )
}

const PieCustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className='rounded-md border-white/50 bg-blue-royal p-2'>
      <p className='font-subtext text-white'>{`${(
        payload[0].value * 100
      ).toFixed(2)}% ${payload[0].name}${label ? " " + label : ""}`}</p>
    </div>
  )
}

export default DashboardAdmin
