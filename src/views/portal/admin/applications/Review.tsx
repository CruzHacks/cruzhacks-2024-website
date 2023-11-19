import React from "react"
import { Link, useParams } from "react-router-dom"
import useApplicationShortResponses from "../../../../hooks/useApplicationShortResponses"
import { AppShortResponseSchema } from "../../../../utils/types"
import { z } from "zod"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

const ApplicationsReviewAdmin = () => {
  let { email } = useParams()
  if (!email) return <p className='text-error'>No Email provided</p>
  email = decodeURIComponent(email).replace(/ /g, ".")

  const {
    data: shortResponses,
    error,
    isError,
  } = useApplicationShortResponses(email)

  return (
    <div className='space-y-10'>
      <Link
        to='/portal/admin/applications'
        className='text-md flex items-center gap-3 text-white/80'
      >
        <ArrowLeftIcon className='h-5 w-auto' /> Back
      </Link>
      <h1 className='font-title text-xl'>
        Hacker Application - <span className='font-subtext'>{email}</span>
      </h1>
      <div className='max-w-4xl'>
        {!isError ? (
          <ShortResponses responses={shortResponses} />
        ) : (
          <div className='space-y-5'>
            <p className='font-subtext leading-8 text-error'>
              Error while fetching short responses. It is possible the hacker
              you are looking for does not exist or that they have not submitted
              an application:
            </p>
            <p className='break-all font-subtext leading-8 text-error'>
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

interface RenderShortResponsesProps {
  responses: z.infer<typeof AppShortResponseSchema> | undefined
}

const ShortResponses = ({ responses }: RenderShortResponsesProps) => {
  const isLoading = !responses
  if (isLoading) {
    return (
      <div className='space-y-10'>
        {[...Array(5).keys()].map(i => (
          <div key={i} className='space-y-2'>
            <p className='h-7 animate-pulse rounded bg-white/10'></p>
            <p className='h-5 animate-pulse rounded bg-white/10'></p>
            <p className='h-5 animate-pulse rounded bg-white/10'></p>
            <p className='h-5 w-1/3 animate-pulse rounded bg-white/10'></p>
          </div>
        ))}
      </div>
    )
  }

  const {
    why_cruzhacks,
    what_would_you_like_to_see,
    grand_invention,
    back_in_time_invention,
    one_plane_ticket_anywhere,
  } = responses

  const isInvalid =
    one_plane_ticket_anywhere === undefined ||
    what_would_you_like_to_see === undefined ||
    why_cruzhacks === undefined ||
    back_in_time_invention === undefined ||
    grand_invention === undefined

  if (isInvalid) {
    return (
      <div className='space-y-5'>
        <p className='text-error'>
          Uh oh! Seems like the short response submissions for this applicant
          are improperly stored or invalid. Printing raw document:
        </p>
        <pre className='text-error'>{JSON.stringify(responses, null, 2)}</pre>
      </div>
    )
  }

  const qa = [
    { question: "Why do you want to attend CruzHacks?", answer: why_cruzhacks },
    {
      question: "What would you like to see at CruzHacks this year?",
      answer: what_would_you_like_to_see,
    },
    {
      question:
        "Excluding all outside factors (money, technology development, etc), what is the grandest invention you would want to create or see?",
      answer: grand_invention,
    },
    {
      question:
        "If you could go back in time, what invention would you like to witness being created?",
      answer: back_in_time_invention,
    },
    {
      question:
        "You have one plane ticket to go anywhere in the world. Where would you go and why?",
      answer: one_plane_ticket_anywhere,
    },
  ]

  return (
    <div className='space-y-10'>
      {qa.map(({ question, answer }) => (
        <div className='space-y-2' key={question}>
          <h2 className='font-title text-lg leading-7'>{question}</h2>
          <p className='font-subtext leading-5'>
            {answer ? (
              answer
            ) : (
              <span className='italic text-pink'>No Response Given</span>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ApplicationsReviewAdmin
