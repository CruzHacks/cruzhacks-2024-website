import React from "react"
import { classNames } from "../../../utils/string"

interface MilestoneProps {
  staisticStyling: string
  statistic: string
  children: string
  childrenTextSize?: string
}

const Milestone = ({
  staisticStyling,
  statistic,
  childrenTextSize = "text-xl lg:text-3xl",
  children,
}: MilestoneProps) => {
  return (
    <div className='flex h-40 w-36 shrink-0 flex-col items-center rounded-xl bg-blue-royal px-2 ring-2 ring-inset ring-white/20 lg:h-52 lg:w-52'>
      <p
        className={classNames(
          "flex h-1/2 grow items-end justify-center pb-3 font-title text-xl lg:text-3xl",
          staisticStyling
        )}
      >
        {statistic}
      </p>
      <p
        className={classNames(
          childrenTextSize,
          "h-1/2 grow text-center font-subtext"
        )}
      >
        {children}
      </p>
    </div>
  )
}

const Milestones = () => {
  return (
    <div className='flex w-full flex-col items-end gap-10'>
      <h2 className='text-right font-title text-3xl uppercase md:text-5xl'>
        Milestones
      </h2>
      <div className='w-20 border-2 text-white'></div>
      <div className='flex w-full flex-wrap justify-evenly gap-8 py-20'>
        <Milestone statistic='400+' staisticStyling='text-gold'>
          hackers
        </Milestone>
        <Milestone statistic='$35k+' staisticStyling='text-turquoise'>
          in prizes
        </Milestone>
        <Milestone
          statistic='56%'
          staisticStyling='text-pink'
          childrenTextSize='text-md lg:text-xl'
        >
          first time hackers
        </Milestone>
        <Milestone
          statistic='27%'
          staisticStyling='text-purple'
          childrenTextSize='text-md lg:text-xl'
        >
          female and non binary hackers
        </Milestone>
      </div>
    </div>
  )
}

export default Milestones
