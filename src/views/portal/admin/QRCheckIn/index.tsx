import React from "react"
import { QrReader } from "react-qr-reader"
import { checkInUser } from "../../../../utils/apis/cloudFunctions"
import toast from "react-hot-toast"
import { isString } from "../../../../utils/string"

const QRCheckInContainer: React.FC = () => {
  const handleScanUID = async (result: string) => {
    try {
      const uid = result
      const hacker = await checkInUser(uid)
      toast.success(`Successfully checked in ${hacker.displayName}`)
    } catch (error) {
      if (error && isString((error as Error).message)) {
        const errorMessage = (error as Error).message
        toast.error(errorMessage)
      }
    }
  }

  return (
    <div className='ml-20 flex h-screen w-full flex-col items-center'>
      <div className='mt-6'>
        <div className='font-title text-3xl'>QR Code Check-In</div>
      </div>

      <div className=''>
        <div className=''>
          {/* QR Camera */}
          <QrReader
            constraints={{ facingMode: "environment" }}
            containerStyle={{
              width: "500px",
            }}
            onResult={(result, error) => {
              if (result) {
                handleScanUID(result.getText())
              }

              if (error) {
                console.info(error)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

const QRCheckIn = () => <QRCheckInContainer />

export default QRCheckIn
