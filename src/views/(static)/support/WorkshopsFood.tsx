import React, { useState } from "react"
import { Dietary, foodInfo } from "./foodInfo"
import { workshopInfo } from "./workshopInfo"

import GlutenFreeLogo from "../../../assets/icons/Gluten Free.svg"
import VegetairanLogo from "../../../assets/icons/Vegetarian.svg"
import VeganLogo from "../../../assets/icons/Vegan.svg"
import PlusLogo from "../../../assets/icons/Plus.svg"
import Card from "../../../components/Card"
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
      <div className='flex justify-evenly'>
        {workshopInfo.map((item, i) => {
          return (
            <button
              key={i}
              className={
                "text-thin cursor-pointer rounded-full p-1 px-3 text-sm text-black " +
                (workshopDay == i && "bg-gray")
              }
              onClick={() => setWorkshopDay(i)}
              onKeyDown={() => setWorkshopDay(i)}
            >
              {"Day " + (i + 1)}
            </button>
          )
        })}
      </div>

      <ul className='flex h-72 flex-col gap-5 overflow-y-scroll'>
        <li className='text-darkgray'>{workshopInfo[workshopDay].date}</li>
        <li className='border-b-2 border-darkgray'></li>

        {workshopInfo[workshopDay].events.map((workshop, i) => {
          return (
            <li className='flex items-center justify-between' key={i}>
              <div>
                <p>{workshop.title}</p>
                <p className='text-[#696969]'>{workshop.location}</p>
                <p className='text-[#A7A7A7]'>{workshop.hostedBy}</p>
              </div>
              <div className='w-5 md:w-2/6'></div>
              <div className='text-thin shrink-0 text-right'>
                <p className='text-darkgray'>{workshop.startTime}-</p>
                <p className='text-darkgray'>{workshop.endTime}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const food = (
    <div className='flex flex-col gap-10 text-black'>
      <div className='flex justify-evenly'>
        {foodInfo.map((item, i) => {
          return (
            <button
              key={i}
              className={
                "text-thin cursor-pointer rounded-full p-1 px-3 text-sm text-darkgray " +
                (foodDay == i && "bg-gray")
              }
              onClick={() => setFoodDay(i)}
              onKeyDown={() => setFoodDay(i)}
            >
              {"Day " + (i + 1)}
            </button>
          )
        })}
      </div>

      <ul className='h-100 flex flex-col gap-5 overflow-y-scroll'>
        <li className='text-darkgray'>{foodInfo[foodDay].date}</li>
        <li className='border-b-2 border-darkgray'></li>

        {foodInfo[foodDay].events.map((meal, i) => {
          return (
            <li className='flex items-center justify-between' key={i}>
              <div>
                <p>{meal.title}</p>
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
                <p className='text-darkgray'>{meal.time}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className='flex flex-col gap-2 rounded-lg bg-gray p-5'>
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
          <img className='w-5' src={VeganLogo} alt='Dietary Restriction Logo' />
          <p>Vegan</p>
        </span>
        <span className='flex items-center gap-2'>
          <img className='w-5' src={PlusLogo} alt='Dietary Restriction Logo' />
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
  )

  return (
    <Card>
      <div className='mb-10 flex flex-col items-center gap-10'>
        <div className='flex w-fit items-center justify-between rounded-xl bg-gray text-blue-chinese'>
          <button
            className={classNames(
              slider && "bg-blue-chinese text-[#FFF]",
              "cursor-pointer rounded-xl p-3 px-9 uppercase"
            )}
            onClick={() => setSlider(true)}
            onKeyDown={() => setSlider(true)}
          >
            Workshops
          </button>
          <button
            className={classNames(
              !slider && "bg-blue-chinese text-[#FFF]",
              "cursor-pointer rounded-xl p-3 px-9 uppercase"
            )}
            onClick={() => setSlider(false)}
            onKeyDown={() => setSlider(false)}
          >
            Food
          </button>
        </div>
      </div>

      {slider ? workshop : food}
    </Card>
  )
}

export default WorkshopsFood
