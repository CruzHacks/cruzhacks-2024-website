import React from "react"
import Card from "../../../components/Card"
import Button from "../../../components/Button"

const QuestionResources: React.FC = () => {
  return (
    <Card title='Have a Question?'>
      <div className='flex flex-col items-center gap-10'>
        {/* <img className='w-2/3' alt='People Graphic' src={People} /> */}
        <p className='font-nunito w-4/5 text-center'>
          Our organizing team is available throughout the whole event. If
          there’s anything you need please contact us through slack or find an
          organizer in person.
        </p>
        <Button
          text='Join Our Slack'
          link='https://www.google.com/url?q=https://join.slack.com/t/cruzhacks2023-7db8697/shared_invite/zt-1mqu9lds7-x6Lj7T126Bc2p1VkaZt05g&sa=D&source=editors&ust=1675319183050096&usg=AOvVaw1Fxo5ltmaqO1rdNPDcvCif'
          type='full'
          override='w-full'
        />
        <a
          className='text-purple underline'
          href='https://docs.google.com/document/u/1/d/e/2PACX-1vTHyuHwcNdhtdovapKJCD5SAlRBkmFsfolBVPRDmoN1O9l6E-nQ0j8AAYWr5_edgVV6JgqdbIkhUYnQ/pub'
        >
          Go to Hack Pack
        </a>
      </div>
    </Card>
  )
}

export default QuestionResources
