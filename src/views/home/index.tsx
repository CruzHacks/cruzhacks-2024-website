import React from "react"
// import useAuth from "../../hooks/useAuth"
import Landing from "./1 - Landing"
import HeroBlurb from "./2 - HeroBlurb"
import Milestones from "./3 - Milestones"
import Speakers from "./4 - Speakers"
import QA from "./5 - Q&A"

import Binary from "../../assets/Binary.jpg"
import TreesBackgroundSmall from "../../assets/illustrations/Trees Background - Small.png"
import Lake from "../../assets/illustrations/Lake.svg"
import Sponsors from "./6 - Sponsors"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
// import { auth } from "../../utils/firebaseapp"
// import useAuth from "../../hooks/useAuth"

// const logout = async () => {
//   await auth
//     .signOut()
//     .then(() => {
//       console.log("User signed out")
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

const Home = () => {
  // const { isAuthenticated } = useAuth()

  return (
    <div className='overflow-x-hidden bg-[#0A1351]'>
      <div
        className='relative m-auto flex min-h-screen max-w-7xl flex-col items-center space-y-10 px-10
        
        '
        style={{
          backgroundImage: `url(${Binary})`,
          backgroundRepeat: "repeat-x",
        }}
      >
        <div className='z-[300] -mb-20 mt-10 flex h-10 w-full max-w-md items-center justify-evenly font-subtext uppercase md:text-xl'>
          <Link to='/#about'>About</Link>
          <Link to='/#qa'>Q&A</Link>
        </div>
        <Landing />
        <div className='-mx-40 flex h-10 items-center'>
          <img
            src={TreesBackgroundSmall}
            alt=''
            className='mt-[-16rem] w-screen md:mt-[-36rem]'
          />
        </div>
        <HeroBlurb id='about' />
        <Milestones />
        <Speakers />
        <QA id='qa' />
        <Sponsors />
        <div className='h-40' />
      </div>
      <img src={Lake} alt='' className='m-auto w-full' />
      <Footer />
    </div>
  )
}

export default Home
