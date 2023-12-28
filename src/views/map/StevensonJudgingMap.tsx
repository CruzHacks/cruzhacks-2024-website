import React from "react"

import StevensonMapImg from "../../assets/maps/judging_map.png"

const StevensonJudgingMap: React.FC = () => {
  return (
    <div className='rounded-xl bg-[#fff] p-5 md:m-auto md:w-[30rem] md:p-5'>
      <img src={StevensonMapImg} alt='UCSC Stevenson College Map' />
    </div>
  )
}

export default StevensonJudgingMap
