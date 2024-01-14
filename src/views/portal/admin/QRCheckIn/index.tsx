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
    <div className='overflow-x-clip px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='font-title text-2xl font-semibold leading-6'>Check-In QR Code Scanner</h1>
          <p className='text-gray-700 mt-2 text-sm'>
            Scan a Hacker's QR Code in the camera box below to check them in at the beginning of the event.
          </p>
        </div>
      </div>

      <div className='rounded-3xl bg-[#4659FF]/10 p-10 md:space-y-10 mt-8 items-center'>
        <div className='sm:flex-auto'>
          <p className='text-gray-700 mt-1 text-sm'>
            When prompted, make sure to enable camera permissions.
          </p>
          <div>
            {/* QR Camera */}
            <QrReader
              constraints={{ facingMode: "environment" }}
              containerStyle={{
                width: "65vw",
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
    </div>
  )
}

const QRCheckIn = () => <QRCheckInContainer />

export default QRCheckIn
