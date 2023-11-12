import React from "react"
import ProgressBar from "../../components/ProgressBar"
import { Outlet } from "react-router-dom"

const sections = [
  "user",
  "demographics",
  "short_response",
  "logistics",
  "socials",
  "waivers",
]

const Apply = () => {
  return (
    <div className='flex h-screen flex-col items-center'>
      <div className='w-full max-w-4xl p-8 md:px-20 md:py-16'>
        <ProgressBar steps={sections} />
      </div>

      <div className='h-full w-full max-w-4xl rounded-t-3xl bg-[#4659FF]/10 p-10 lg:mb-16 lg:rounded-3xl'>
        <Outlet />
      </div>
    </div>
  )
}

export default Apply

// const sections: Section[] = [
// {
//   progressStep: 0,
//   header: "Welcome",
//   subtext:
//     "We're so excited to have you! Let's get started with registration.",
//   questions: [
//     {
//       id: "email",
//       initText: "Email",
//       Icon: EnvelopeIcon,
//       type: "text",
//     },
//     {
//       id: "first_name",
//       initText: "First Name",
//       Icon: UserIcon,
//       type: "text",
//     },
//     {
//       id: "last_name",
//       initText: "Last Name",
//       type: "text",
//     },
//     {
//       id: "phone_number",
//       initText: "Phone Number",
//       type: "text",
//     },
//   ],
// },
// {
//   progressStep: 0,
//   header: "Password",
//   subtext: "Set a password to be used to login to your portal.",
//   questions: [
//     {
//       id: "password",
//       question: "",
//       initText: "Password",
//       Icon: LockClosedIcon,
//       type: "text",
//     },
//     {
//       id: "password",
//       question: "",
//       initText: "Confirm Password",
//       Icon: LockClosedIcon,
//       type: "text",
//     },
//   ],
// },
// {
//   progressStep: 1,
//   header: "Demographic Information",
//   subtext:
//     "The information collected here will be used for statistical purposes only, in accordance with the MLH Privacy Policy (https://mlh.io/privacy).",
//   questions: [
//     {
//       id: "age",
//       question: "Whats your age?",
//       initText: "Age",
//       type: "text",
//     },
//     {
//       id: "location",
//       question: "Where do you reside?",
//       initText: "Choose",
//       type: "combobox",
//       options: [
//         { id: 1, name: "person1" },
//         { id: 2, name: "person2" },
//       ],
//     },
//     {
//       id: "school",
//       question: "What school do you attend? Or most recently attended?",
//       initText: "Choose",
//       type: "combobox",
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "year",
//       question: "What year are you in?",
//       initText: "",
//       type: "radio",
//       options: [
//         { id: 1, name: "High School" },
//         { id: 2, name: "Freshman" },
//         { id: 3, name: "Sophmore" },
//         { id: 4, name: "Junior" },
//         { id: 5, name: "Senior" },
//         { id: 6, name: "Graduate" },
//       ],
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "year",
//       question:
//         "In what type of educational institution are you currently enrolled in?",
//       type: "radio-wrap",
//       options: [
//         { id: 1, name: "Less than Secondary/High School" },
//         { id: 2, name: "Secondary/High School" },
//         { id: 3, name: "Undergraduate" },
//         { id: 4, name: "Community College" },
//         { id: 5, name: "Graduate" },
//         { id: 6, name: "Code School/Bootcamp" },
//         {
//           id: 7,
//           name: "Other Vocational/Trade Program or Apprenticeship",
//         },
//         { id: 8, name: "Not currently a student" },
//         { id: 9, name: "Prefer not to answer" },
//         { id: 10, name: "Other" },
//       ],
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "firstTime",
//       question: "Will this be your first time attending CruzHacks?",
//       type: "combobox",
//       options: [],
//     },
//     {
//       id: "firstTime",
//       question: "Have you attended any hackathons before? If so, how many?",
//       type: "combobox",
//       options: [],
//     },
//     {
//       id: "firstTime",
//       question:
//         "Do you have prior tech experience? If so, in what context (i.e. classes, internships, personal projects)?",
//       type: "short-answer",
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "ucscCollege",
//       question: "UCSC College Affiliation",
//       initText: "",

//       type: "radio-wrap",
//       options: [
//         { id: 1, name: "College 9" },
//         { id: 2, name: "Oakes" },
//         { id: 3, name: "Rachel Carson" },
//         { id: 4, name: "Kresge" },
//         { id: 5, name: "Cowell" },
//         { id: 6, name: "Stevenson" },
//         { id: 7, name: "Merrill" },
//         { id: 8, name: "Porter" },
//         { id: 9, name: "Crown" },
//         { id: 10, name: "John R. Lewis" },
//         { id: 11, name: "UCSC Graduate Student (No Affiliation)" },
//         { id: 12, name: "N/A (I do not attend UCSC)" },
//       ],
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "gradYear",
//       question: "What year will you graduate from your current school?",
//       type: "radio",
//       options: [
//         { id: 1, name: "2023" },
//         { id: 2, name: "2024" },
//         { id: 3, name: "2025" },
//         { id: 4, name: "2026" },
//         { id: 5, name: "2027" },
//         { id: 6, name: "2028 and beyond" },
//       ],
//     },
//   ],
// },
// {
//   progressStep: 1,
//   questions: [
//     {
//       id: "major",
//       question:
//         "What is your major/primary area of study? If you already graduated, what was your major/primary area of study?",
//       initText: "",
//       type: "combobox",
//       options: [],
//     },
//   ],
// },
// ]

// interface QuestionProps {
// id: string
// question?: string
// initText?: string
// Icon?: Icon
// type: string
// options?: { id: number; name: string }[]
// }

// type Section = {
//   progressStep: number
//   header?: string
//   subtext?: string
//   questions: QuestionProps[]
// }
