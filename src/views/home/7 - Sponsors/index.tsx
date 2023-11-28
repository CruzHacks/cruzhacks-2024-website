import React from "react"

import UniversialAudio from "../../../assets/sponsors/UniversalAudio.png"
import BaskinEngineering from "../../../assets/sponsors/BaskinEngineering.svg"
import CIED from "../../../assets/sponsors/CIED.svg"
import SouthSwellVentures from "../../../assets/sponsors/SouthSwellVentures.png"

// NOTE: these are last years sponsors, please update with this years sponsors
const sponsors = [
  // Tier 1
  [
    {
      name: "Universal Audio",
      icon: UniversialAudio,
      url: "https://www.uaudio.com/",
    },
    {
      name: "Baskin Engineering",
      icon: BaskinEngineering,
      url: "https://www.soe.ucsc.edu/",
    },
    {
      name: "CIED",
      icon: CIED,
      url: "https://cied.ucsc.edu/",
    },
  ],

  // Tier 2
  [
    {
      name: "qb3",
      icon: undefined,
      url: "",
    },
  ],

  // Tier 3
  [
    {
      name: "South Swell Ventures",
      icon: SouthSwellVentures,
      url: "",
    },
    {
      name: "Insprit AI",
    },
  ],
]

const Sponsors = ({ id }: { id?: string }) => {
  return (
    <div className='flex flex-col items-center gap-10 py-10'>
      {/* Scroll Anchor*/}
      <div className='absolute -mt-40' id={id}></div>

      <h2 className='text-center font-title text-2xl uppercase md:text-4xl'>
        thanks to our sponsors!
      </h2>
      <div className='flex max-w-4xl flex-col items-center justify-between gap-10 rounded-xl bg-blue-royal/50 p-10 ring-2 ring-inset ring-white/10'>
        {sponsors.map((tier, i) => {
          return (
            <div
              key={"tier" + i}
              className='flex flex-row items-center justify-between gap-3 md:gap-10'
            >
              {tier.map(({ name, url, icon }) => (
                <a
                  key={name}
                  target='_blank'
                  rel='noopener noreferrer'
                  href={url}
                  className='flex-1'
                >
                  <img
                    src={icon}
                    alt={`${name} Icon`}
                    className='h-auto w-full'
                  />
                </a>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sponsors
