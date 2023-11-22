import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"

const Landing = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className='-mb-24 flex min-h-screen w-fit flex-col items-center justify-center md:items-start'>
      <h1 className='font-title text-6xl uppercase md:text-8xl lg:text-9xl'>
        Cruz
      </h1>
      <h1 className='font-title text-6xl uppercase md:pl-28 md:text-8xl lg:text-9xl'>
        Hacks
      </h1>
      <p className='font-title text-lg uppercase md:self-end md:text-2xl lg:text-3xl'>
        2024 HACKATHON
      </p>
      <p className='w-2/3 self-center text-center font-subtext text-sm uppercase md:w-1/2 md:self-end md:text-right lg:w-full'>
        JAN 19-21 • UC SANTA CRUZ, STEVENSON EVENT CENTER
      </p>
      {!isAuthenticated ? (
        <Link
          to='/apply'
          className='mt-10 flex h-12 w-64 items-center justify-center self-center rounded-full bg-gradient-to-r from-[#02D4BF] via-[#5156E4] to-[#7F37E2] font-title text-xl  leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:ml-20 md:self-start'
        >
          apply
        </Link>
      ) : (
        <Link
          to='/portal'
          className='mt-10 flex h-12 w-64 items-center justify-center self-center rounded-full bg-gradient-to-r from-[#02D4BF] via-[#5156E4] to-[#7F37E2] font-title text-xl  leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:ml-20 md:self-start'
        >
          portal
        </Link>
      )}
    </div>
  )
}

export default Landing
