import React from "react"
import Sidebar from "../Sidebar"
import { CameraIcon, HomeIcon } from "@heroicons/react/24/outline"

const nav = [
  {
    name: "Dashboard",
    href: "/portal/hacker",
    icon: HomeIcon,
  },
  // {
  //   name: "Check In",
  //   href: "/portal/hacker/check-in",
  //   icon: CameraIcon,
  // },
]

const HackerPortal = () => {
  return (
    <div className='min-h-screen'>
      <Sidebar navigation={nav} />
    </div>
  )
}

export default HackerPortal
