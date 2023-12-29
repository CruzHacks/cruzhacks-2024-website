import React from "react"
import Button from "../../../../components/Button"

const SubmitProject: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 rounded-3xl bg-[#4659FF]/10 p-10'>
      <h2 className='font-subtext'>Finished Your Project?</h2>
      <h1 className='font-title text-2xl'>Submit Project</h1>

      <div className='m-auto flex flex-col items-center gap-5 md:w-5/6'>
        <p className='font-nunito pb-10'>
          Log in to CruzHacks portal and head over to Team&gt;Submit Project.
          Follow instructions accordingly to submit your project or click the
          button below to be taken directly!
        </p>
        <Button
          text='Submit Project'
          link='https://cruzhacks-2023.devpost.com/'
          type='full'
          override='w-full md:w-2/3'
        />
      </div>
    </div>
  )
}

export default SubmitProject
