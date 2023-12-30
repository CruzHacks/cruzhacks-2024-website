import React from "react"

import { Link } from "react-router-dom"

const Support = () => {
  return (
    <div className='space-y-10'>
      <h1 className='font-title text-4xl'>Support</h1>

      <ul className='list-disc space-y-5'>
        <li className='underline'>
          <Link className='text-blue-button' to='resources'>
            Resources
          </Link>
        </li>
        <li className='underline'>
          <Link className='text-blue-button' to='maps'>
            Maps
          </Link>
        </li>
        <li className='underline'>
          <Link className='text-blue-button' to='faq-and-rules'>
            FAQ And Rules
          </Link>
        </li>
        <li>
          Join our discord and ask for help in the #help-and-questions channel
        </li>
        <li>Email us at contact@cruzhacks.com</li>
      </ul>
    </div>
  )
}

export default Support
