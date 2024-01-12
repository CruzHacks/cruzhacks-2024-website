import React from "react"
import { FAQsInfo } from "./FaqInfo"
import Card from "../../../../components/Card"

const FAQCard: React.FC = () => {
  return (
    <Card title='FAQs'>
      <ul className='flex flex-col gap-10 font-subtext text-black'>
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
