import React, { useState } from "react"
import Card from "../../../components/Card"

const scheduleInfo = [
  {
    date: "Friday, Febuary 3rd",
    events: [
      ["Hacker Registration/ Dinner", "5:00 pm"],
      ["Opening Ceremony", "7:00 pm"],
      ["Hacking Begins", "9:00 pm"],
      ["Workshops Begin", "9:00 pm"],
    ],
  },
  {
    date: "Saturday, Febuary 4th",
    events: [
      ["Breakfast", "8:00 am"],
      ["Workshops Continue", "9:00 am"],
      ["Lunch", "1:00 pm"],
      ["Dinner", "5:30 pm"],
      ["DevPost Soft Deadline", "10:00 pm"],
    ],
  },
  {
    date: "Sunday, Febuary 5th",
    events: [
      ["Breakfast", "9:00 am"],
      ["Code Freeze/ Submit Project", "9:00 am"],
      ["Judging Begins", "11:30 am"],
      ["Lunch", "12:00 pm"],
      ["Closing Ceremony", "2:00 pm"],
      ["CruzHacks 2023 concludes", "4:00 pm"],
    ],
  },
]

const Schedule: React.FC = () => {
  const [day, setDay] = useState(0)

  return (
    <Card title='Schedule'>
      <div className='flex flex-col gap-10 text-black'>
        <div className='flex justify-evenly'>
          {scheduleInfo.map((schedule, key) => {
            return (
              <button
                key={key}
                className={
                  "text-thin cursor-pointer rounded-full p-1 px-3 text-sm text-darkgray " +
                  (day == key && "bg-gray")
                }
                onClick={() => setDay(key)}
                onKeyDown={() => setDay(key)}
              >
                {"Day " + (key + 1)}
              </button>
            )
          })}
        </div>

        <ul className='flex h-72 flex-col gap-5'>
          <li className='text-darkgray'>{scheduleInfo[day].date}</li>
          <li className='border-b-2 border-darkgray'></li>
          <ul className='flex flex-col gap-5 overflow-y-scroll'>
            {scheduleInfo[day].events.map((schedule, key) => {
              return (
                <li className='flex items-center justify-between' key={key}>
                  <p>{schedule[0]}</p>
                  <div className='w-5'></div>
                  <p className='shrink-0 text-darkgray'>{schedule[1]}</p>
                </li>
              )
            })}
          </ul>
        </ul>
      </div>
    </Card>
  )
}

export default Schedule
