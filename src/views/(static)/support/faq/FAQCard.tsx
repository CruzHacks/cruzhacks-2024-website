import React from "react"
import { FAQsInfo } from "./FaqInfo"

const FAQCard: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 rounded-3xl bg-[#4659FF]/10 p-10'>
      <h1 className='font-title text-2xl'>FAQ</h1>
      <ul className='flex flex-col gap-10 font-subtext'>
        {FAQsInfo.map((faq, i) => {
          return (
            <li key={i}>
              <h4>{faq.question}</h4>
              <p className='mt-1 font-thin'>{faq.answer}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FAQCard
