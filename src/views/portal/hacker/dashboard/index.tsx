import React from "react"
import QRCode from "react-qr-code"
import useAuth from "../../../../hooks/useAuth"

const DashbaordHacker = () => {
  const {
    auth: { user },
  } = useAuth()

  return (
    <div>
      <h1 className='font-title text-3xl'>Dashboard</h1>
    </div>
  )
}

export default DashbaordHacker
