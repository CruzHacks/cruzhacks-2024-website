import React from "react"
// import BackgroundHeader from "../../components/BackgroundHeader"
import FAQCard from "./FAQCard"
import Rules from "./Rules"

const FAQ = () => {
  return (
    <div className='mx-auto max-w-screen-md p-10'>
      {/* <BackgroundHeader /> */}

      <div className='flex flex-col items-stretch justify-center gap-10'>
        <h1 className='font-title text-4xl text-white md:pb-10 lg:text-6xl'>
          FAQ & Rules
        </h1>

        <FAQCard />
        <Rules />
      </div>
    </div>
  )
}

export default FAQ
