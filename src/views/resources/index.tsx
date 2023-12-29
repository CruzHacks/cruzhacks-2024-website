import React from "react"
import ScrollToTop from "../../components/scrollControl/ScrollToTop"
import Navbar from "../../components/Navbar"

import Binary from "../../assets/Binary.jpg"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"

const Resources = () => {
  return (
    <div className='overflow-x-hidden bg-[#0A1351]' id='landing'>
      {/* Put scroll at top on navigation */}
      <ScrollToTop />

      <div
        className='relative z-0 m-auto flex min-h-screen max-w-7xl flex-col items-center space-y-10 bg-repeat-x px-10'
        style={{
          backgroundImage: `url(${Binary})`,
        }}
      >
        <Navbar />
        <div className='h-10' />

        <h1 className='font-title text-4xl'>Resources</h1>

        <div className='flex flex-col gap-10'>
          <Link to='/resources/support'>Support</Link>
          <Link to='/resources/maps'>Maps</Link>
          <Link to='/resources/faq-and-rules'>FAQ And Rules</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Resources
