import { LinkIcon } from "@heroicons/react/24/outline"
import React from "react"
import { Link } from "react-router-dom"

interface LinkBoxProps {
  text: string
  to: string
  newTab?: boolean
}

const LinkBox = ({ text, to }: LinkBoxProps) => {
  return (
    <Link
      to={to}
      className='rint-inset right-white/30 flex items-center justify-center gap-5 rounded-md bg-white/20 px-5 py-3 ring-2 ring-white/50'
    >
      <LinkIcon className='h-8 w-8' />
      <p>{text}</p>
    </Link>
  )
}

export default LinkBox
