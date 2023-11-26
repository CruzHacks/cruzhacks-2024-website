import React from "react"

const PrizeTracks = ({ id }: { id?: string }) => {
  return (
    <div id={id}>
      <h2 className='text-right font-title text-3xl uppercase md:text-5xl'>
        Prize Tracks
      </h2>
    </div>
  )
}

export default PrizeTracks
