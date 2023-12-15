import React from "react"
import ScrollToTop from "../../components/scrollControl/ScrollToTop"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Organizer, advisors, boardOfDirectors, organizers } from "./data"

import Binary from "../../assets/Binary.jpg"
import Lake from "../../assets/illustrations/Lake.svg"
import LinkedIn from "../../assets/icons/LinkedIn.svg"
import CruzHacksLogo from "../../assets/logos/CruzHacks.svg"

const TeamMember = ({ name, role, image, linkedIn }: Organizer) => {
  if (!image || image == "") {
    image = CruzHacksLogo
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <img
        src={image}
        alt={name}
        className='h-40 w-40 rounded-full border-4 border-white/20 object-cover'
      />
      <h3 className='text-center font-title text-lg uppercase md:text-lg'>
        {name}
      </h3>
      <p className='text-center font-subtext'>{role}</p>
      {linkedIn && linkedIn != "" && (
        <a
          href={linkedIn}
          target='_blank'
          rel='noopener noreferrer'
          className='text-center font-subtext'
        >
          <img src={LinkedIn} alt='' className='h-8 w-8' />
        </a>
      )}
    </div>
  )
}

const Team = () => {
  return (
    <div className='overflow-x-hidden bg-[#0A1351]' id='landing'>
      {/* Put scroll at top on navigation */}
      <ScrollToTop />

      <div
        className='relative z-0 m-auto flex max-w-7xl flex-col items-center gap-20 bg-repeat-x px-10'
        style={{
          backgroundImage: `url(${Binary})`,
        }}
      >
        <Navbar />
        <div className='h-10' />
        <div className='flex flex-col items-center gap-6 py-10 md:py-20'>
          <h2 className='text-center font-title text-3xl uppercase md:text-5xl'>
            Our History
          </h2>
          <p className='max-w-2xl text-center font-subtext text-lg'>
            CruzHacks was founded in 2013 as Hack UCSC by Mark Adams, Brent
            Haddad, and Doug Erickson. In 2018, Hack UCSC was rebranded as
            CruzHacks, and became a student-led non-profit hackathon. Throughout
            the years, CruzHacks/Hack UCSC has sparked innovation and creativity
            from attendees, and has even been the source of a few start-up
            companies.
          </p>
        </div>

        <div className='space-y-20'>
          <h2 className='text-center font-title text-3xl uppercase md:text-5xl'>
            2024 Organizing Team
          </h2>

          <div className='grid grid-cols-1 gap-5 gap-y-20 md:grid-cols-3'>
            {organizers.map(organizer => {
              return <TeamMember key={organizer.name} {...organizer} />
            })}
          </div>
        </div>

        <div className='flex flex-col items-center gap-10 py-10 md:flex-row md:items-start md:py-20'>
          <div className='flex max-w-sm flex-1 flex-col items-center gap-6'>
            <h3 className='text-center font-title text-2xl uppercase md:text-4xl'>
              Board of directors
            </h3>
            <ul className='space-y-1 text-center font-subtext'>
              {boardOfDirectors.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div className='flex max-w-sm flex-1 flex-col items-center gap-6'>
            <h3 className='text-center font-title text-2xl uppercase md:text-4xl'>
              Advisers
            </h3>
            <ul className='space-y-1 text-center font-subtext'>
              {advisors.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='h-10' />
      <img src={Lake} alt='' className='m-auto w-full' />
      <Footer />
    </div>
  )
}

export default Team
