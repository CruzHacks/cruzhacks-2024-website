import React from "react"
import { useZxing } from "react-zxing"
import { checkInUser } from "../../../../utils/apis/cloudFunctions"
import toast from "react-hot-toast"
import { isString } from "../../../../utils/string"
import { CameraIcon } from "@heroicons/react/24/outline"
import type { User } from "firebase/auth"

const QRCheckInContainer: React.FC = () => {
  const { ref } = useZxing({
    onDecodeResult: result => {
      console.log(result)
      handleScanUID(result.getText())
    },
    onError: error => {
      console.error(error)
    },
  })
  const [lastScanned, setLastScanned] = React.useState<User>()

  const handleScanUID = async (result: string) => {
    try {
      const uid = result
      const hacker = await checkInUser(uid)
      setLastScanned(hacker)
      toast.success(`Successfully checked in ${hacker.displayName}`)
    } catch (error) {
      if (error && isString((error as Error).message)) {
        const errorMessage = (error as Error).message
        toast.error(errorMessage)
      }
    }
  }

  return (
    <div className='space-y-10 overflow-x-clip px-4 sm:px-6 lg:px-8'>
      <div className='space-y-3'>
        <h1 className='font-title text-2xl font-semibold leading-6'>
          Check-In QR Code Scanner
        </h1>
        <p className=''>
          Scan a Hacker&apos;s QR Code in the camera box below to check them in
          at the beginning of the event.
        </p>
      </div>

      <div className='flex w-full items-center justify-center'>
        <div className='flex w-fit flex-col items-center justify-center gap-3 rounded-3xl bg-[#4659FF]/10 p-5 md:p-10'>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={ref}
            className='h-full max-h-80 w-full max-w-80 bg-blue-imperial'
          />

          <p className='w-full max-w-80 text-center font-subtext text-sm text-white/70'>
            When prompted, make sure to enable{" "}
            <CameraIcon className='-mt-0.5 inline-block h-4 w-4' /> permissions.
          </p>
        </div>
        {lastScanned && (
          <div className='flex w-fit flex-col items-center justify-center gap-3 rounded-3xl bg-[#4659FF]/10 p-5 md:p-10'>
            <h2 className='font-title text-xs'>Last Scanned</h2>
            <p>{lastScanned.email}</p>
            <p>{lastScanned.displayName}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const QRCheckIn = () => <QRCheckInContainer />

export default QRCheckIn
