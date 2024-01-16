import React from "react"
import StatisticsDisplay from "./Statistics"
import MakeAnnoucements from "./MakeAnnoucements"

const DashboardAdmin = () => {
  return (
    <div className='space-y-10'>
      <h1 className='font-title text-xl'>Dashboard</h1>
      <MakeAnnoucements />

      <StatisticsDisplay />
    </div>
  )
}
export default DashboardAdmin
