import React, { useState } from "react"
import Card from "../../../components/Card"
import { classNames } from "../../../utils/string"

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
    <div className='h-full w-full grow space-y-5 rounded-3xl bg-[#4659FF]/10 px-10 py-5 md:p-10 lg:mb-16'>
      <div>
        <h2 className='text-center font-title text-2xl font-bold uppercase md:text-3xl'>
          Schedule
        </h2>
        <h3 className='text-center text-white/80'>{scheduleInfo[day].date}</h3>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex justify-center'>
          {scheduleInfo.map((schedule, i) => {
            return (
              <div key={i} className='flex items-center'>
                <button
                  className={classNames(
                    day == i ? "bg-blue-royal text-orange" : "text-white/80",
                    "text-thin cursor-pointer rounded-full border-2 border-white/80 p-1 px-3 text-sm hover:text-orange"
                  )}
                  onClick={() => setDay(i)}
                  onKeyDown={() => setDay(i)}
                >
                  {"Day " + (i + 1)}
                </button>
                {i != scheduleInfo.length - 1 && (
                  <div className='h-0.5 w-5 bg-white/80' />
                )}
              </div>
            )
          })}
        </div>

        <div className='border-b-2 border-white/80' />
        <ul className='flex h-72 flex-col gap-5'>
          <ul className='flex flex-col overflow-y-scroll'>
            {scheduleInfo[day].events.map((schedule, key) => {
              return (
                <li className='flex w-full items-start justify-start' key={key}>
                  <p className='-mt-1.5 w-32 shrink-0 text-right text-white/80'>
                    {schedule[1]}
                  </p>
                  <div>
                    <div className='flex flex-col items-center px-5'>
                      <div className='h-3 w-3 rounded-full border-2' />
                      <div className='h-20 w-0.5 bg-white/80' />
                    </div>
                  </div>
                  <p className='-mt-1.5'>{schedule[0]}</p>
                </li>
              )
            })}
          </ul>
        </ul>
      </div>
    </div>
  )
}

export default Schedule
