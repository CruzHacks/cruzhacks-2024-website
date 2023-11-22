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
    <div className='mb-10 flex w-full justify-between gap-10'>
      <div className='space-y-6'>
        <div className='mb-10 w-20 border-2 text-white'></div>
        <h2 className='font-title text-3xl uppercase'>Social Good</h2>
        <p className='text-lg lg:text-2xl'>
          CruzHacks is the largest hackathon in Santa Cruz. Each year, we invite
          hundreds of students to develop solutions to real-world problems,
          pursue inclusion in tech, and kindle the spirit of innovation.
        </p>
        <div className='max-w-md'>
          <EmailRegister />
        </div>
        <div className='flex justify-between gap-8 pb-5 lg:justify-start'>
          <img src={Instagram} alt='Instagram Page' className='h-10 w-auto' />
          <img src={Facebook} alt='Facebook Page' className='h-10 w-auto' />
          <img src={LinkedIn} alt='LinkedIn Page' className='h-10 w-auto' />
          <img src={Twitter} alt='Twitter Page' className='h-10 w-auto' />
          <EnvelopeIconOutline className='h-10 w-auto' />
          <img src={Discord} alt='Discord Page' className='h-10 w-auto' />
        </div>
      </div>
      <img src={HandAndComputer} alt='' className='hidden w-1/2 md:flex' />
    </div>
  )
}

export default HeroBlurb
