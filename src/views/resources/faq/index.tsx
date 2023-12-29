import React from "react"
// import BackgroundHeader from "../../components/BackgroundHeader"
import FAQCard from "./FAQCard"
import Rules from "./Rules"

const FAQ = () => {
  return (
    <div className='mx-auto max-w-screen-md p-10'>
      {/* <BackgroundHeader /> */}

      <div className='my-20 flex flex-col items-stretch justify-center gap-10'>
        <h1 className='text-4xl text-white md:py-10 lg:text-6xl'>
          FAQ & Rules
        </h1>

        <FAQCard />
        <Rules />
      </div>
    </div>
  )
}

export default FAQ
