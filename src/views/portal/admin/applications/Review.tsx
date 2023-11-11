import React from "react"
import { useParams } from "react-router-dom"

const ApplicationsReviewAdmin = () => {
  const { email } = useParams()

  return (
    <div>
      <h1 className='font-title text-xl'>Review</h1>
      <p>{email}</p>
    </div>
  )
}

export default ApplicationsReviewAdmin
