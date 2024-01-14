import React, { useState } from "react"
import { Dietary, foodInfo } from "./foodInfo"
import { workshopInfo } from "./workshopInfo"

import GlutenFreeLogo from "../../../assets/icons/Gluten Free.svg"
import VegetairanLogo from "../../../assets/icons/Vegetarian.svg"
import VeganLogo from "../../../assets/icons/Vegan.svg"
import PlusLogo from "../../../assets/icons/Plus.svg"
import { classNames } from "../../../utils/string"

const matchLogo = (symb: Dietary) => {
  switch (symb) {
    case Dietary.GlutenFree:
      return GlutenFreeLogo
    case Dietary.Vegetarian:
      return VegetairanLogo
    case Dietary.Vegan:
      return VeganLogo
  }
}

const WorkshopsFood: React.FC = () => {
  const [slider, setSlider] = useState(true)
  const [workshopDay, setWorkshopDay] = useState(0)
  const [foodDay, setFoodDay] = useState(0)

  const workshop = (
    <div className='flex flex-col gap-10 text-black'>
      <div className='flex justify-center'>
        {workshopInfo.map((item, i) => {
          return (
            <div key={i} className='flex items-center'>
              <button
                className={classNames(
                  workshopDay == i
                    ? "bg-blue-royal text-orange"
                    : "text-white/80",
                  "text-thin cursor-pointer rounded-full border-2 border-white/80 p-1 px-3 text-sm hover:text-orange"
                )}
                onClick={() => setWorkshopDay(i)}
                onKeyDown={() => setWorkshopDay(i)}
              >
                {"Day " + (i + 1)}
              </button>

              {i != workshopInfo.length - 1 && (
                <div className='h-0.5 w-5 bg-white/80' />
              )}
            </div>
          )
        })}
      </div>

      <div className='border-b-2 border-white/80' />

      <ul className='flex h-72 flex-col gap-5 overflow-y-scroll lg:h-[30rem]'>
        {workshopInfo[workshopDay].events.map((workshop, i) => {
          return (
            <li className='flex items-center justify-between' key={i}>
              <div>
                <p className='text-white'>{workshop.title}</p>
                <p className='text-orange'>{workshop.location}</p>
                <p className='text-[#A7A7A7]'>{workshop.hostedBy}</p>
              </div>
              <div className='w-5 md:w-2/6' />
              <div className='text-thin shrink-0 text-right'>
                <p className='text-pink'>{workshop.startTime}-</p>
                <p className='text-pink'>{workshop.endTime}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const food = (
    <div className='flex flex-col gap-10 text-black'>
      <div className='flex justify-center'>
        {foodInfo.map((item, i) => {
          return (
            <div key={i} className='flex items-center'>
              <button
                className={classNames(
                  foodDay == i ? "bg-blue-royal text-orange" : "text-white/80",
                  "text-thin cursor-pointer rounded-full border-2 border-white/80 p-1 px-3 text-sm hover:text-orange"
                )}
                onClick={() => setFoodDay(i)}
                onKeyDown={() => setFoodDay(i)}
              >
                {"Day " + (i + 1)}
              </button>
              {i != foodInfo.length - 1 && (
                <div className='h-0.5 w-5 bg-white/80' />
              )}
            </div>
          )
        })}
      </div>

      <div className='border-b-2 border-white/80' />

      <div className='space-y-10'>
        <ul className='flex flex-col gap-5 overflow-y-scroll'>
          {foodInfo[foodDay].events.map((meal, i) => {
            return (
              <li className='flex items-center justify-between' key={i}>
                <div>
                  <p className='text-white'>{meal.title}</p>
                  {meal.items.map((item, j) => {
                    return (
                      <span key={j} className='flex items-center gap-2'>
                        <p className='text-[#696969]'>{item.name}</p>
                        {item.dietary.map((symb, k) => {
                          return (
                            <img
                              key={k}
                              className='w-5'
                              src={matchLogo(symb)}
                              alt='Dietary Restriction Logo'
                            />
                          )
                        })}
                      </span>
                    )
                  })}
                  <p className='text-[#A7A7A7]'>{meal.provider}</p>
                </div>
                <div className='w-5 md:w-2/6'></div>
                <div className='text-thin shrink-0 text-right'>
                  <p className='text-pink'>{meal.time}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className='flex flex-col gap-2 rounded-lg bg-blue-royal p-5 text-white'>
          <span className='flex items-center gap-2'>
            <img
              className='w-5'
              src={GlutenFreeLogo}
              alt='Dietary Restriction Logo'
            />
            <p>Gluten Free</p>
          </span>
          <span className='flex items-center gap-2'>
            <img
              className='w-5'
              src={VegetairanLogo}
              alt='Dietary Restriction Logo'
            />
            <p>Vegetarian</p>
          </span>
          <span className='flex items-center gap-2'>
            <img
              className='w-5'
              src={VeganLogo}
              alt='Dietary Restriction Logo'
            />
            <p>Vegan</p>
          </span>
          <span className='flex items-center gap-2'>
            <img
              className='w-5'
              src={PlusLogo}
              alt='Dietary Restriction Logo'
            />
            <p>All Weekend Long:</p>
          </span>
          <ul className='list-disc pl-10'>
            <li>Fruit Snacks</li>
            <li>Oreos</li>
            <li>Lays</li>
            <li>Red Vines</li>
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <div className='h-full w-full max-w-full flex-1 space-y-5 rounded-3xl px-10 py-5 md:p-10'>
      <div className='flex flex-col items-center gap-10'>
        <div className='flex w-fit items-center justify-between rounded-xl text-sm text-blue-chinese lg:text-xl'>
          <button
            className={classNames(
              slider && "bg-blue-chinese text-[#FFF]",
              "cursor-pointer rounded-xl p-3 px-9 font-title uppercase"
            )}
            onClick={() => setSlider(true)}
            onKeyDown={() => setSlider(true)}
          >
            Workshops
          </button>
          <button
            className={classNames(
              !slider && "bg-blue-chinese text-[#FFF]",
              "cursor-pointer rounded-xl p-3 px-9 font-title uppercase"
            )}
            onClick={() => setSlider(false)}
            onKeyDown={() => setSlider(false)}
          >
            Food
          </button>
        </div>
      </div>

      <h3 className='text-center text-white/80'>
        {slider ? workshopInfo[workshopDay].date : foodInfo[foodDay].date}
      </h3>

      {slider ? workshop : food}
    </div>
  )
}

export default WorkshopsFood
