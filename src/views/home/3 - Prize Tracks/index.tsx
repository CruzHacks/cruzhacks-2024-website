import React from "react"
import { CategoryTracks, PrizeTrack, TechCaresTracks } from "./data"
import { classNames } from "../../../utils/string"

const MainTrackCard = ({ Icon, color, title, blurb }: PrizeTrack) => {
  return (
    <div
      className={classNames(
        color,
        "group flex h-80 w-80 flex-col items-center overflow-hidden rounded-xl bg-blue-royal p-5 ring-2 ring-inset ring-white/20 transition-all hover:items-start"
      )}
    >
      <Icon className='grow transition-all group-hover:w-20 group-hover:grow-0' />
      <h3 className='pt-3 font-title text-lg'>{title}</h3>
      <p className='max-h-0 font-subtext opacity-0 transition-all group-hover:max-h-[500rem] group-hover:opacity-100'>
        {blurb}
      </p>
    </div>
  )
}

const CategoryPrizeCard = ({ Icon, color, title, blurb }: PrizeTrack) => {
  return (
    <div
      className={classNames(
        color,
        "group flex h-80 w-2/3 flex-col items-center overflow-hidden rounded-xl bg-blue-royal p-2 ring-2 ring-inset ring-white/20 transition-all hover:items-start md:w-40"
      )}
    >
      <Icon className='max-w-full grow transition-all group-hover:hidden' />
      <h3 className='text-center font-title text-xs group-hover:text-left'>
        {title}
      </h3>
      <p className='max-h-0 font-subtext text-base opacity-0 transition-all group-hover:max-h-[500rem] group-hover:opacity-100'>
        {blurb}
      </p>
    </div>
  )
}

const PrizeTracks = ({ id }: { id?: string }) => {
  return (
    <div id={id} className='flex flex-col items-center justify-center py-16'>
      <h2 className='text-center font-title text-3xl uppercase md:text-5xl'>
        Tech Cares Tracks
      </h2>
      <div className='flex flex-wrap justify-center gap-10 py-10'>
        {TechCaresTracks.map(track => (
          <MainTrackCard key={track.title} {...track} />
        ))}
      </div>
      <h2 className='pt-10 text-center font-title text-2xl uppercase md:text-4xl'>
        Category Prizes
      </h2>
      <div className='flex flex-wrap justify-center gap-10 py-10'>
        {CategoryTracks.map(track => (
          <CategoryPrizeCard key={track.title} {...track} />
        ))}
      </div>
    </div>
  )
}

export default PrizeTracks
