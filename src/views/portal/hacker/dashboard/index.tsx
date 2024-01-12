import React from "react"
import QRCode from "react-qr-code"
import useAuth from "../../../../hooks/useAuth"

const DashbaordHacker = () => {
  const {
    auth: { user },
  } = useAuth()

  return (
    <div>
      <h1>Dashbaord</h1>

      {user ? (
        <QRCode value={user.uid} />
      ) : (
        // SHOULD NEVER HAPPEN
        <p className='text-error'>No User</p>
      )}
    </div>
  )
}

export default DashbaordHacker
