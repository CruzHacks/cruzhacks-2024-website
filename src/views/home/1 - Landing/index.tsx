import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"

import HackersOnLog from "../../../assets/illustrations/Hackers on Log.svg"
import Fire from "../../../assets/illustrations/Fire.svg"

const Landing = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='z-10 -mb-24 flex min-h-screen w-fit flex-col items-center justify-center md:items-start 3xl:min-h-[80rem]'>
        <h1 className='z-10 font-title text-6xl uppercase md:text-8xl lg:text-9xl'>
          Cruz
        </h1>
        <h1 className='z-10 font-title text-6xl uppercase md:pl-28 md:text-8xl lg:text-9xl'>
          Hacks
        </h1>
        <p className='z-10 font-title text-lg uppercase md:self-end md:text-2xl lg:text-3xl'>
          2024 HACKATHON
        </p>
        <p className='z-10 w-2/3 self-center text-center font-subtext text-sm uppercase md:w-1/2 md:self-end md:text-right lg:w-full'>
          JAN 19-21 • UC SANTA CRUZ, STEVENSON EVENT CENTER
        </p>
        {!isAuthenticated ? (
          <Link
            to='/apply'
            className='z-10 mt-10 flex h-12 w-64 items-center justify-center self-center rounded-full bg-gradient-to-r from-[#02D4BF] via-[#5156E4] to-[#7F37E2] font-title  text-xl leading-6 text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:ml-20 md:self-start'
          >
            apply
          </Link>
        ) : (
          <Link
            to='/portal'
            className='z-10 mt-10 flex h-12 w-64 items-center justify-center self-center rounded-full bg-gradient-to-r from-[#02D4BF] via-[#5156E4] to-[#7F37E2] font-title  text-xl leading-6 text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:ml-20 md:self-start'
          >
            portal
          </Link>
        )}
      </div>

      <div className='flex h-10 w-full justify-between'>
        <img
          src={HackersOnLog}
          alt='Hackers on Log'
          className='z-0 -ml-16 -mt-40 w-40 md:-ml-32 md:-mt-96 md:w-96'
        />
        <img
          src={Fire}
          alt='Fire'
          className='z-0 -mt-36 w-20 md:-mt-80 md:w-48'
        />
      </div>
    </div>
  )
}

export default Landing
