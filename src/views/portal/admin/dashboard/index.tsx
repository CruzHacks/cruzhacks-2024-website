import React, { useEffect, useState } from "react"
import {
  ApplicationSchemaDto,
  ReChartsArray,
  RechartsStatistics,
} from "../../../../utils/types"
import {
  generateStatistics,
  submitApplicationUnauthed,
} from "../../../../utils/apis/cloudFunctions"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

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

const COLORS = ["#E558F4", "#13E4CA", "#5B1FED", "#F9A318"]

const statisticKeyToTitle = (statisticKey: string) => {
  return statisticKey.replace(/_/g, " ")
}

const rechartsArrayToPieChartData = (
  rechartsArray: ReChartsArray
): ReChartsArray => {
  return rechartsArray.map(rechartsObject => {
    return {
      name: rechartsObject.name,
      value: rechartsObject.value / rechartsArray.length,
    }
  })
}

const DashboardAdmin = () => {
  const [statistics, setStatistics] = useState<RechartsStatistics>()

  useEffect(() => {
    const getStats = async () => {
      try {
        const _statistics = await generateStatistics()
        console.log(_statistics)
        setStatistics(_statistics)
      } catch (err) {
        console.error(err)
      }
    }
    getStats()
  }, [])

  return (
    <div>
      <h1 className='font-title text-xl'>Dashboard</h1>

      {/* TEMP */}
      <button
        type='button'
        onClick={() => submitSampleApps()}
        className='mt-3 rounded-md bg-blue-button/10 p-3 font-bold'
      >
        Create sample apps
      </button>

      {statistics && (
        <div>
          <h2 className='font-title text-lg'>Demographics</h2>
          <div className='grid grid-cols-2 grid-rows-2'>
            <FormattedPieChart
              data={statistics?.demographics?.age}
              title={"Age"}
            />

            {/* {statistics?.demographics &&
          Object.keys(statistics?.demographics).map((statisticKey: string) => {
            const statistic = rechartsArrayToPieChartData(
              statistics.demographics[statisticKey]
            )

            console.log(statistic)

            return (
              <FormattedPieChart
                key={statisticKey}
                data={statistic}
                title={statisticKeyToTitle(statisticKey)}
              />
            )
          })} */}
          </div>
        </div>
      )}
    </div>
  )
}

const FormattedPieChart = ({
  data,
  title,
}: {
  data: ReChartsArray
  title: string
}) => {
  return (
    <div className='text-md flex flex-col items-center'>
      <h1 className='font-title capitalize'>{title}</h1>
      <PieChart width={200} height={200} className='mb-20 text-white'>
        <Tooltip
          content={data => <CustomTooltip {...data} label='years old' />}
        />
        <Legend verticalAlign='bottom' height={2} />
        <Pie
          type='monotone'
          data={rechartsArrayToPieChartData(data)}
          dataKey='value'
          name='name'
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
        >
          {data.map((_, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className='rounded-md border-white/50 bg-blue-royal p-2'>
      <p className='font-subtext text-white'>{`${(
        payload[0].value * 100
      ).toFixed(2)}% ${payload[0].name} ${label}`}</p>
    </div>
  )
}

export default DashboardAdmin
