import React, { ReactElement, useState } from "react"
import { classNames } from "../../../utils/string"
import { StarIcon } from "@heroicons/react/24/outline"
import faqs from "./data"

import Grid from "../../../assets/illustrations/Grid.svg"

interface FAQItemProps {
  question: string
  answer: ReactElement
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <button
      className='rounded-2xl border-2 border-turquoise bg-blue-imperial'
      onClick={toggleOpen}
    >
      <div className='flex items-center justify-between gap-2 px-5 py-3'>
        <p className='text-left'>{question}</p>
        <StarIcon
          className={classNames(
            !open ? "rotate-0 fill-none" : "rotate-45 fill-turquoise",
            "h-6 w-6 shrink-0 text-turquoise transition-all"
          )}
        />
      </div>
      <div
        className={classNames(
          !open ? "invisible max-h-0 " : "max-h-[500rem] pb-5 text-white/90",
          "px-5 text-left font-subtext transition-all"
        )}
      >
        {answer}
      </div>
    </button>
  )
}

const QA = ({ id }: { id?: string }) => {
  return (
    <div
      className='bg-repeat py-40'
      style={{
        backgroundImage: `url(${Grid})`,
      }}
    >
      <h2
        className='py-10 text-center font-title text-3xl uppercase md:text-5xl'
        id={id}
      >
        Q&A
      </h2>
      <div className='flex w-full flex-col items-stretch justify-stretch gap-3 md:flex-row'>
        {faqs.map((faqSection, j) => (
          <div key={j} className='flex h-full w-full flex-col gap-3 md:w-1/2'>
            {faqSection.map(faq => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QA
