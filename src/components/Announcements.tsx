import React, { useState, useEffect } from "react"
import Card from "../components/Card"
import { ref, onValue } from "firebase/database"
import { rtdb } from "../utils/firebaseapp"

export type Announcement = {
  body: string
  date: number
  title: string
}

const convertDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString("default", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  })
}

const convertTime = (date: number) => {
  const d = new Date(date)
  return d.toLocaleTimeString("default", { hour: "numeric", minute: "2-digit" })
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    // Firebase Realtime Database reference
    const dbRef = ref(rtdb, "announcements")

    // Listen for changes in the 'announcements' node
    onValue(dbRef, snapshot => {
      const announcementsData = snapshot.val()
      if (announcementsData) {
        const announcementsArray = Object.keys(announcementsData).map(key => {
          return announcementsData[key]
        })
        // Sort the announcements by date in descending order
        announcementsArray.sort((a, b) => b.date - a.date)
        setAnnouncements(announcementsArray)
      } else {
        setAnnouncements([])
      }
    })

    // Clean up the listener on unmount
    return () => {
      onValue(dbRef, () => {})
    }
  }, [])

  return (
    <Card override='self-center w-full p-10 md:p-8 lg:p-8 md:w-5/6'>
      {announcements && announcements.length > 0 ? (
        <ul className='flex h-80 flex-col gap-5 overflow-y-scroll rounded py-5 md:bg-[#D9D9D91A] md:p-10'>
          {announcements.map((announcement: Announcement, key: number) => {
            return (
              <li className='border-b border-[#D7D7D7]' key={key}>
                <p className='text-[#61A564]'>
                  {convertTime(announcement.date)}
                </p>
                <p className='py-2 md:p-5 md:px-10'>{announcement.body}</p>
                <p className='float-right text-[#A1A1A1]'>
                  {convertDate(announcement.date)}
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className='flex h-80 flex-col items-center justify-center rounded py-5 md:bg-[#D9D9D91A] md:p-10'>
          <p className='text-center'>No Announcements yet, stay tuned!</p>
        </div>
      )}
    </Card>
  )
}

export default Announcements
