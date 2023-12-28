import React from "react"
import Button from "../../components/Button"
import Card from "../../components/Card"

const TeamFinder: React.FC = () => {
  return (
    <Card
      introTitle="Don't Have a Team Yet?"
      title='Find a Team to Join & Submit'
    >
      <ol className='font-nunito m-auto flex flex-col gap-5 md:w-5/6'>
        <li>
          1. Join our Slack channel{" "}
          <a
            className='text-blue underline'
            href='https://cruzhacks23-attendees.slack.com/archives/C04HZQRR8NS'
          >
            #team-formation
          </a>{" "}
          to find your team of hackers!
        </li>
        <li className='flex flex-col gap-2 md:px-5'>
          <p>Team Formation Guidelines:</p>
          <p className='font-thin'>- Must be compromised of 1-4 people</p>
          <p className='font-thin'>
            - The project must be completed at the event
          </p>
          <p className='font-thin'>
            - All members must be an accepted applicant to CruzHacks 2023
          </p>
        </li>
        <li>
          2. Found your team? Log in and{" "}
          <a className='text-blue' href='/'>
            submit your team in the CruzHacks portal
          </a>{" "}
          and get ready to start hacking!
        </li>
      </ol>
      <div className='flex w-full flex-col items-stretch pt-5'>
        <Button
          text='Submit Team'
          link='https://cruzhacks.com/myPortal/?ext=team'
          type='full'
          override='w-full md:w-1/2 m-auto'
        />
      </div>
    </Card>
  )
}

export default TeamFinder
