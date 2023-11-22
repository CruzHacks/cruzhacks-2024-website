import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Landing from "./1 - Landing"
import HeroBlurb from "./2 - HeroBlurb"
import Milestones from "./3 - Milestones"
import Speakers from "./4 - Speakers"
import QA from "./5 - Q&A"
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
    <div className='flex min-h-screen flex-col items-center justify-center gap-5 bg-[#040E5D] px-10'>
      {!isAuthenticated && (
        <p className='absolute right-10 top-10 ml-10 font-subtext text-sm'>
          Already submitted an application?{" "}
          <Link to='/login' className='text-blue-button'>
            Login
          </Link>
        </p>
      )}
      <Landing />
      <HeroBlurb />
      <Milestones />
      <Speakers />
      <QA />
    </div>
  )
}

export default Home
