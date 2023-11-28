import React from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import Binary from "../../assets/Binary.jpg"
import Lake from "../../assets/illustrations/Lake.svg"

const Team = () => {
  return (
    <div className='overflow-x-hidden bg-[#0A1351]' id='landing'>
      <div
        className='relative z-0 m-auto flex max-w-7xl flex-col items-center gap-20 bg-repeat-x px-10'
        style={{
          backgroundImage: `url(${Binary})`,
        }}
      >
        <Navbar />
        <div className='h-10' />
        <div className='flex flex-col items-center gap-6'>
          <h2 className='text-center font-title text-3xl uppercase md:text-5xl'>
            Our History
          </h2>
          <p className='max-w-2xl text-center font-subtext'>
            CruzHacks was founded in 2013 as Hack UCSC by Mark Adams, Brent
            Haddad, and Doug Erickson. In 2018, Hack UCSC was rebranded as
            CruzHacks, and became a student-led non-profit hackathon. Throughout
            the years, CruzHacks/Hack UCSC has sparked innovation and creativity
            from attendees, and has even been the source of a few start-up
            companies.
          </p>
        </div>
        <div className='flex flex-col items-center gap-6'>
          <h2 className='text-center font-title text-3xl uppercase md:text-5xl'>
            Board of directors
          </h2>
          <ul className='space-y-1 text-center font-subtext'>
            <li>Doug Erickson</li>
            <li>Nathan Westrup</li>
            <li>Amanda Rotella</li>
            <li>Nada Miljkovic</li>
            <li>Drew Meyer</li>
          </ul>
        </div>
      </div>
      <div className='h-10' />
      <img src={Lake} alt='' className='m-auto w-full' />
      <Footer />
    </div>
  )
}

export default Team
