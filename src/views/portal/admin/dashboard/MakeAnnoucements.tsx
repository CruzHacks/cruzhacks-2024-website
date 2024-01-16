import { push, ref, set } from "firebase/database"
import { serverTimestamp } from "firebase/firestore"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { rtdb } from "../../../../utils/firebaseapp"

const MakeAnnoucements = () => {
  const [notifyBody, setNotifyBody] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNotifyBody(e.target.value)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (notifyBody === "") {
      toast.error("An announcement must have a body... 😑")
      return
    }

    const newData = {
      title: "",
      body: notifyBody,
      date: serverTimestamp(),
    }

    const announcementsRef = ref(rtdb, "announcements")
    const newReference = push(announcementsRef)

    set(newReference, newData)
      .then(() => {
        console.log("Data added to announcements successfully!")
        toast.success("Successfully Delivered Announcement 😎")
        setNotifyBody("")
      })
      .catch(error => {
        console.error("Error adding data to announcements:", error)
        toast.error("Unable to deliver message, please try again. 🤬")
      })
  }

  return (
    <div>
      <div className=''>
        <div className=''>
          <div className=''>What do you want to say?</div>
          <textarea
            className=''
            value={notifyBody}
            onChange={e => handleChange(e)}
          />
          <div>
            <div>
              <button className='' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakeAnnoucements
