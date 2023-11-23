import React from "react"
import { EnvelopeIcon as EnvelopeIconOutline } from "@heroicons/react/24/outline"
import EmailRegister from "./EmailRegister"

import Instagram from "../../../assets/icons/Instagram.svg"
import Facebook from "../../../assets/icons/Facebook.svg"
import LinkedIn from "../../../assets/icons/LinkedIn.svg"
import Twitter from "../../../assets/icons/Twitter.svg"
import Discord from "../../../assets/icons/Discord.svg"

import HandAndComputer from "../../../assets/illustrations/Hand & Computer.svg"

const HeroBlurb = () => {
  return (
    <div className='flex w-full justify-between gap-10 pb-16'>
      <div className='space-y-6'>
        <div className='mb-10 w-20 border-2 text-white'></div>
        <h2 className='font-title text-3xl uppercase md:text-5xl'>
          Social Good
        </h2>
        <p className='text-lg lg:text-2xl'>
          CruzHacks is the largest hackathon in Santa Cruz. Each year, we invite
          hundreds of students to develop solutions to real-world problems,
          pursue inclusion in tech, and kindle the spirit of innovation.
        </p>
        <div className='max-w-md'>
          <EmailRegister />
        </div>
        <div className='flex flex-wrap justify-between gap-8 pb-5 md:justify-start'>
          <img
            src={Instagram}
            alt='Instagram Page'
            className='h-8 w-auto lg:h-10'
          />
          <img
            src={Facebook}
            alt='Facebook Page'
            className='h-8 w-auto lg:h-10'
          />
          <img
            src={LinkedIn}
            alt='LinkedIn Page'
            className='h-8 w-auto lg:h-10'
          />
          <img
            src={Twitter}
            alt='Twitter Page'
            className='h-8 w-auto lg:h-10'
          />
          <EnvelopeIconOutline className='h-8 w-auto shrink-0 lg:h-10' />
          <img
            src={Discord}
            alt='Discord Page'
            className='h-8 w-auto lg:h-10'
          />
        </div>
      </div>
      <img src={HandAndComputer} alt='' className='hidden w-1/2 md:flex' />
    </div>
  )
}

export default HeroBlurb
