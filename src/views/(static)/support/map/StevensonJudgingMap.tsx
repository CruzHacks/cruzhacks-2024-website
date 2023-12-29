import React from "react"

import StevensonMapImg from "../../../../assets/maps/judging_map.png"

const StevensonJudgingMap: React.FC = () => {
  return (
    <div className='flex h-full w-full max-w-4xl grow flex-col rounded-3xl bg-[#4659FF]/10 p-10'>
      <img src={StevensonMapImg} alt='UCSC Stevenson College Map' />
    </div>
  )
}

export default StevensonJudgingMap
