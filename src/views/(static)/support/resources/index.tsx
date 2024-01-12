import React from "react"
// import BackgroundHeader from "../../components/BackgroundHeader"
import EventInfo from "./EventInfo"
import Hackerpack from "./Hackerpack"
import SubmitProject from "./SubmitProject"
import TeamFinder from "./TeamFinder"
import BackgroundHeader from "../BackgroundHeader"

const Resources = () => {
  return (
    <div className='mx-auto max-w-screen-md px-10'>
      <BackgroundHeader />

      <div className='mb-20 flex flex-col items-stretch justify-center gap-10 text-black'>
        <h1 className='font-title text-4xl text-white md:py-10 lg:text-6xl'>
          Essential Resources
        </h1>

        <Hackerpack />
        <TeamFinder />
        <SubmitProject />
        <EventInfo />
      </div>
    </div>
  )
}

export default Resources
