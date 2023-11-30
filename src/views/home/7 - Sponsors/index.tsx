import React from "react"

// Tier 1
import UniversialAudio from "../../../assets/sponsors/UniversalAudio.svg"

// Tier 2
import BaskinEngineering from "../../../assets/sponsors/BaskinEngineering.svg"
import CIED from "../../../assets/sponsors/CIED.svg"

// Tier 3
import QB3 from "../../../assets/sponsors/QB3.svg"
import HumanitiesInsititue from "../../../assets/sponsors/HumanitiesInstitute.svg"
import HumanitiesDivision from "../../../assets/sponsors/HumanitiesDivision.svg"

// Tier 4
import SUA from "../../../assets/sponsors/SUA.svg"

// Tier 5
import SouthSwell from "../../../assets/sponsors/SouthSwell.svg"
import ArtsDivision from "../../../assets/sponsors/ArtsDivision.svg"
import GenomicsInstitute from "../../../assets/sponsors/GenomicsInstitute.svg"
import Citris from "../../../assets/sponsors/Citris.svg"

// Tier 6
import ChooseSC from "../../../assets/sponsors/ChooseSC.svg"
import InspiritAi from "../../../assets/sponsors/InspiritAi.svg"
import TeachingLearningCenter from "../../../assets/sponsors/TeachingLearningCenter.svg"
import ArtsResearchInstitute from "../../../assets/sponsors/ArtsResearchInstitute.svg"

// NOTE: these are last years sponsors, please update with this years sponsors
const sponsors = [
  // Tier 1
  [
    {
      name: "Universal Audio",
      icon: UniversialAudio,
      url: "https://www.uaudio.com/",
    },
  ],

  // Tier 2
  [
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

  // Tier 3
  [
    {
      name: "qb3",
      icon: QB3,
      url: "https://qb3.ucsc.edu/",
    },
    // {
    //   name: "Division of Student Affairs",
    //   url: "https://studentsuccess.ucsc.edu/",
    // },
    {
      name: "The Humanities Institute",
      icon: HumanitiesInsititue,
      url: "https://thi.ucsc.edu/",
    },
    {
      name: "The Humanities Division",
      icon: HumanitiesDivision,
      url: "https://humanities.ucsc.edu/",
    },
  ],

  // Tier 4
  [{ name: "SUA", icon: SUA, url: "https://sua.ucsc.edu/" }],

  // Tier 5
  [
    {
      name: "South Swell Ventures",
      icon: SouthSwell,
      url: "https://www.linkedin.com/in/bud-colligan-1793022/",
    },
    // {
    //   name: "City of Santa Cruz Economic Development",
    //   url: "https://www.cityofsantacruz.com/government/city-departments/economic-development",
    // },
    {
      name: "Division of the Arts",
      icon: ArtsDivision,
      url: "https://arts.ucsc.edu/page/division-description",
    },
    {
      name: "Genomics Institute",
      icon: GenomicsInstitute,
      url: "https://genomics.ucsc.edu/",
    },
    { name: "CITRIS", icon: Citris, url: "https://citris-uc.org/" },
    // { name: "CROSS" },
  ],
  [
    // Tier 6
    {
      name: "Insprit AI",
      icon: InspiritAi,
      url: "https://www.inspiritai.com/",
    },
    {
      name: "Choose Santa Cruz",
      icon: ChooseSC,
      url: "https://www.choosesantacruz.com/",
    },
    {
      name: "Teaching and Learning Center",
      icon: TeachingLearningCenter,
      url: "https://tlc.ucsc.edu/",
    },
    {
      name: "Arts Research Institute",
      icon: ArtsResearchInstitute,
      url: "https://ari.ucsc.edu/",
    },
  ],
]

const Sponsors = ({ id }: { id?: string }) => {
  return (
    <div className='flex flex-col items-center gap-10 py-20'>
      {/* Scroll Anchor*/}
      <div className='absolute -mt-40' id={id}></div>

      <h2 className='text-center font-title text-2xl uppercase md:text-4xl'>
        thanks to our sponsors!
      </h2>
      <div className='flex max-w-4xl flex-col items-center justify-between gap-4 rounded-xl bg-blue-royal/50 p-10 ring-2 ring-inset ring-white/10'>
        {sponsors.map((tier, i) => {
          return (
            <div
              key={"tier" + i}
              className='flex flex-col items-center justify-between gap-10 md:flex-row'
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
                    style={{ maxHeight: `${20 - i * 5}rem` }} // bit of a magic resize, may need to adjust based on tier logos
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
