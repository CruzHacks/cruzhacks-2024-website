import React from "react"

import { Link } from "react-router-dom"

import MouseAndStars from "../../../../assets/illustrations/Mouse and Stars.svg"
import Maps from "../../../../assets/illustrations/Maps.svg"
import Clipboard from "../../../../assets/illustrations/Clipboard.svg"
import Schedule from "./Schedule"
import WorkshopsFood from "./WorkshopsFood"
import QuestionResources from "./QuestionResources"

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
    <div className='mx-auto max-w-screen-md'>
      <div className='mb-20 flex flex-col items-stretch justify-center gap-10 text-black'>
        <h1 className='font-title text-3xl text-white md:py-10 md:text-4xl lg:text-6xl'>
          Support
        </h1>

        <div className='flex flex-col items-center gap-10 md:h-60 md:flex-row md:items-stretch'>
          {supportLinks.map(link => (
            <SupportLink key={link.title} {...link} />
          ))}
        </div>

        <Schedule />
        <WorkshopsFood />
        <QuestionResources />
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
        <img src={illustration} alt='' />
        <p className='font-subtext text-lg lowercase text-white'>{title}</p>
      </Link>
    </div>
  )
}

export default Support
