import React from "react"

import { Link } from "react-router-dom"

import MouseAndStars from "../../../assets/illustrations/Mouse and Stars.svg"
import Maps from "../../../assets/illustrations/Maps.svg"
import Clipboard from "../../../assets/illustrations/Clipboard.svg"
import Schedule from "./Schedule"
import WorkshopsFood from "./WorkshopsFood"

const supportLinks = [
  {
    illustration: MouseAndStars,
    title: "resources",
    link: "resources",
  },
  {
    illustration: Maps,
    title: "maps",
    link: "maps",
  },
  {
    illustration: Clipboard,
    title: "faqs",
    link: "faq-and-rules",
  },
]

const Support = () => {
  return (
    <div className='w-full space-y-10 pb-20 pt-5 md:pb-0 md:pt-20'>
      <h1 className='font-title text-3xl uppercase md:text-5xl'>Support</h1>

      <div className='flex flex-col items-center gap-10 md:h-60 md:flex-row md:items-stretch'>
        {supportLinks.map(link => (
          <SupportLink key={link.title} {...link} />
        ))}
      </div>

      <div className='flex w-full flex-col gap-10 lg:flex-row'>
        <Schedule />

        <WorkshopsFood />
      </div>

      <div className='text-subtext pb-20 font-subtext'>
        <p>
          Feel free to reach out to us at{" "}
          <Link
            to='mail:contact@cruzhacks.com'
            className='text-blue-button hover:underline'
          >
            contact@cruzhacks.com
          </Link>{" "}
          for any questions,
        </p>

        <p>or ask for help in the #help-and-questions channel on Discord.</p>
      </div>
    </div>
  )
}

const SupportLink = ({
  illustration,
  title,
  link,
}: {
  illustration: string
  title: string
  link: string
}) => {
  return (
    <div className='group flex h-60 w-full max-w-xs items-center justify-center md:h-full md:w-1/3 md:max-w-none'>
      <Link
        to={link}
        className='flex h-full w-full flex-col items-center justify-center gap-5 rounded-lg bg-blue-royal px-20 py-5 ring-4 ring-inset ring-white/10 transition-all group-hover:h-5/6 group-hover:w-5/6 group-hover:bg-blue-imperial'
      >
        <img src={illustration} alt='' className='' />
        <p className='font-subtext text-lg lowercase'>{title}</p>
      </Link>
    </div>
  )
}

export default Support
