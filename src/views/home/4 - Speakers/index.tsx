import React from "react"

import Mushrroms from "../../../assets/illustrations/Mushrooms.png"
import TreesBackgroundBig from "../../../assets/illustrations/Trees Background - Big.png"

type Speaker = {
  image: string
  name: string
  blurb: string
}

const speakerData: Speaker[] = [
  {
    image: "",
    name: "Micheal Lopp",
    blurb: "Senior Director of Engineering @ Apple; UCSC Alumni",
  },
  {
    image: "",
    name: "Raghav Jandhyala",
    blurb: "Chief Product Officer, Microsoft Dynamics 365",
  },
  {
    image: "",
    name: "Mark Adams",
    blurb: `Co-founder of CruzHacks / OnePlus Amazon Account Manager`,
  },
  {
    image: "",
    name: "Brent Haddad",
    blurb: `Brent Haddad, MBA, Ph.D.
    Professor of Environmental Studies, UCSC
    Co-founder, HackUCSC`,
  },
  {
    image: "",
    name: "Nada Miljkovic",
    blurb: `Co-Founder @ GetVirtual; Project Manager for UCSC’s 
    Center for Innovation and Entrepreneurial Development`,
  },
  {
    image: "",
    name: "Gregor Veble Mikić",
    blurb: "Chief Aerodynamicist at Joby Aviation",
  },
  {
    image: "",
    name: "Alexander Wolf",
    blurb: "Dean of the Baskin School of Engineering at UC Santa Cruz",
  },
]

const SpeakerCard = ({ image, name, blurb }: Speaker) => {
  return (
    <div className='flex flex-col items-center justify-center border-2'>
      <img src={image} alt='' className='w-40' />
      <p className='font-title text-2xl'>{name}</p>
      <p className='text-center font-subtext'>{blurb}</p>
    </div>
  )
}

const Speakers = () => {
  return (
    <>
      <div className='z-10 w-full'>
        <p className='pb-5 uppercase text-white/50'>Hear from the best</p>
        <h2 className='font-title text-3xl uppercase md:text-5xl'>Speakers</h2>
        <img
          src={Mushrroms}
          alt=''
          className='w-30 invisible absolute -right-5 md:visible'
        />
        <div className='flex py-40'>
          {speakerData.map(speaker => (
            <SpeakerCard key={speaker.name} {...speaker} />
          ))}
        </div>
      </div>
      <div className='-mx-40 flex h-10 items-center'>
        <img src={TreesBackgroundBig} alt='' className='mt-[-70rem] w-screen' />
      </div>
    </>
  )
}

export default Speakers
