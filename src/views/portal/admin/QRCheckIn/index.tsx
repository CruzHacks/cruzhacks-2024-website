import React, { useState, Dispatch } from "react"
import { QrReader } from "react-qr-reader"
import {
  checkIn,
  getHacker,
  HackerQRProps,
} from "../UserManagement/api"


const QRCheckInContainer: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    // const { getAccessTokenSilently } = useAuth0()
    // const { setBanner } = useBanner()
    const [hacker, setHacker] = useState<HackerQRProps>({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    })
  
    return (
      <div>

        {/* Temporary space for sidebar, replaced with actual sidebar later */}
        
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-blue-imperial px-6'>
            <div className='mt-2 flex h-16 shrink-0 items-center'>
              Sidebar
            </div>
          </div>
        </div>

        {/* QR code page */}
        <div className='flex w-full flex-col items-center h-screen ml-20'>
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
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const QRCheckIn = () => (
      <QRCheckInContainer />
  )
  
  export default QRCheckIn