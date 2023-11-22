import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Landing from "./1 - Landing"
import HeroBlurb from "./2 - HeroBlurb"
import Milestones from "./3 - Milestones"
import Speakers from "./4 - Speakers"
import QA from "./5 - Q&A"

import Binary from "../../assets/Binary.jpg"
import TreesBackgroundSmall from "../../assets/illustrations/Trees Background - Small.png"
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
  const { isAuthenticated } = useAuth()

  return (
    <div
      className='bg-[#0A1351]'
      style={{
        backgroundImage: `url(${Binary})`,
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className='m-auto flex min-h-screen max-w-7xl flex-col items-center space-y-10 px-10'>
        <div className='-mb-20 mt-10 flex h-10 w-full max-w-md items-center justify-evenly font-subtext uppercase md:text-xl'>
          <p>Home</p>
          <p>About</p>
          <p>Milestones</p>
        </div>
        {/* {!isAuthenticated && (
          <p className='absolute right-10 top-10 ml-10 font-subtext text-sm'>
            Already submitted an application?{" "}
            <Link to='/login' className='text-blue-button'>
              Login
            </Link>
          </p>
        )} */}
        <Landing />
        <div className='-mx-40 flex h-0 items-center'>
          <img src={TreesBackgroundSmall} alt='' className='-mt-96 w-screen' />
        </div>
        <HeroBlurb />
        <Milestones />
        <Speakers />
        <QA />
      </div>
    </div>
  )
}

export default Home
