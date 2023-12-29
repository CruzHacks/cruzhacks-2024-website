import React from "react"
import Button from "../../../components/Button"

const Hackerpack: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 rounded-3xl bg-[#4659FF]/10 p-10'>
      <h2 className='font-subtext'>Ready to Start Hacking?</h2>
      <h1 className='font-title text-2xl'>Hackerpack & Starter Pack</h1>

      <div className='flex flex-col items-center gap-3'>
        <p className='font-nunito mb-10 text-left md:w-5/6'>
          You can find everything you need to know in our Hacker Packet PDF. It
          covers what you need to bring, travel info, workshop info, and more.
          Our starter pack will have code that can help you jumpstart your
          projects!
        </p>
        <Button
          text='View Hacker Packet'
          link='https://docs.google.com/document/u/1/d/e/2PACX-1vTHyuHwcNdhtdovapKJCD5SAlRBkmFsfolBVPRDmoN1O9l6E-nQ0j8AAYWr5_edgVV6JgqdbIkhUYnQ/pub'
          type='full'
          override='w-full md:w-1/2'
        />
        <Button
          text='Starter Pack'
          link='https://github.com/CruzHacks/Cruzhacks-Hacker-Packs'
          type='clear'
          override='w-full md:w-1/2'
        />
      </div>
    </div>
  )
}

export default Hackerpack
