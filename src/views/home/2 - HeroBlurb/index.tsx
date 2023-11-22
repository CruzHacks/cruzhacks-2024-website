import React from "react"
import {
  ArrowRightIcon,
  EnvelopeIcon as EnvelopeIconOutline,
} from "@heroicons/react/24/outline"
import { EnvelopeIcon as EnvelopeIconSolid } from "@heroicons/react/24/solid"

import Instagram from "../../../assets/icons/Instagram.svg"
import Facebook from "../../../assets/icons/Facebook.svg"
import LinkedIn from "../../../assets/icons/LinkedIn.svg"
import Twitter from "../../../assets/icons/Twitter.svg"
import Discord from "../../../assets/icons/Discord.svg"

const HeroBlurb = () => {
  return (
    <div className='space-y-8'>
      <div className='mb-10 w-20 border-2 text-white'></div>
      <h2 className='font-title text-2xl uppercase'>Social Good</h2>
      <p className='text-lg'>
        CruzHacks is the largest hackathon in Santa Cruz. Each year, we invite
        hundreds of students to develop solutions to real-world problems, pursue
        inclusion in tech, and kindle the spirit of innovation.
      </p>
      <div className='flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#104183] to-[#261F8A] p-3'>
        <div className='flex border-b-2 border-white'>
          <EnvelopeIconSolid className='w-5' />
          <input
            className='active:ring-none focuse:outline-none border-0 border-transparent bg-transparent font-subtext uppercase text-white placeholder:text-white/75 focus:border-transparent focus:ring-0'
            type='text'
            placeholder='Email Address'
          />
        </div>
        <ArrowRightIcon className='h-9 w-auto rounded-lg bg-white p-1 text-blue-imperial' />
      </div>
      <div className='flex justify-between'>
        <img src={Instagram} alt='Instagram Page' className='h-10 w-auto' />
        <img src={Facebook} alt='Facebook Page' className='h-10 w-auto' />
        <img src={LinkedIn} alt='LinkedIn Page' className='h-10 w-auto' />
        <img src={Twitter} alt='Twitter Page' className='h-10 w-auto' />
        <EnvelopeIconOutline className='h-10 w-auto' />
        <img src={Discord} alt='Discord Page' className='h-10 w-auto' />
      </div>
    </div>
  )
}

export default HeroBlurb
