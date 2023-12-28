import React from "react"
import Card from "../../components/Card"
import { FAQsInfo } from "./FaqInfo"

const FAQCard: React.FC = () => {
  return (
    <Card title='FAQ'>
      <ul className='font-nunito flex flex-col gap-10'>
        {FAQsInfo.map((faq, i) => {
          return (
            <li key={i}>
              <h4>{faq.question}</h4>
              <p className='mt-1 font-thin'>{faq.answer}</p>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default FAQCard
