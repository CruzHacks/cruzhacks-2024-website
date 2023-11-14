import React from "react"
import { FormTemplate } from "../../../utils/hackerapplication"

export const shortResponseSteps: FormTemplate[] = [
  [
    [
      <p key='title'>TODO: short response LOGO</p>,
      { text: "Short Answer", type: "title" },
      {
        text: "This is where we'll get to know you. Your responses here are what we look at when reviewing applications.",
      },
    ],
  ],
  [
    [
      <p key='title'>TODO: requirements LOGO</p>,
      { text: "Requirements", type: "title" },
      {
        text: "Your response can be as long or as short as you'd like, so long as it does not exceed 1500 characters.",
      },
    ],
  ],
  [
    [
      { text: "Why do you want to attend CruzHacks?" },
      { inputType: "textarea", rows: 20, field: "why_cruzhacks" },
    ],
  ],
]
