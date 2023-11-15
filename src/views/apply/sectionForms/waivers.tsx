import React from "react"
import { FormTemplate } from "../../../utils/hackerapplication"

export const waiversSteps: FormTemplate[] = [
  // Step 1
  [
    [
      {
        text: "Code of Conduct Data Sharing Terms & Conditions",
        type: "title",
      },
    ],
    [
      <div
        key='waiver_step_mlh'
        className='max-w-md space-y-5 rounded-3xl bg-white/10 p-5 text-center text-sm ring-2 ring-inset ring-white/10'
      >
        <h2 className='font-title'>MLH Code of Conduct</h2>
        <p className='text-center font-subtext text-xs'>
          I have read and agree to the MLH Code of Conduct{" "}
          <a
            href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-blue-button'
          >
            https://static.mlh.io/docs/mlh-code-of-conduct.pdf
          </a>
        </p>
      </div>,
    ],
    [{ inputType: "radio", field: "mlh_code_conduct", options: ["Yes"] }],
  ],

  // Step 2
  [
    [
      {
        text: "Code of Conduct, Data Sharing, and Terms & Conditions",
        type: "title",
      },
    ],
    [
      <div
        key='waiver_step_mlh'
        className='max-w-md space-y-5 rounded-3xl bg-white/10 p-5 text-center text-sm ring-2 ring-inset ring-white/10'
      >
        <p className='text-center font-subtext text-xs'>
          I authorize CruzHacks to share my application/registration information
          with Major League Hacking for event administration, ranking, and MLH
          administration in-line with the MLH Privacy Policy (
          <a
            href='https://mlh.io/privacy'
            target='_blank'
            rel='noreferrer'
            className='text-blue-button'
          >
            https://mlh.io/privacy
          </a>
          ). I further agree to the terms of both the MLH Contest Terms and
          Conditions (
          <a
            href='https://github.com/MLH/mlh-policies/blob/main/contest-terms.md'
            target='_blank'
            rel='noreferrer'
            className='text-blue-button'
          >
            https://github.com/MLH/mlh-policies/blob/main/contest-terms.md
          </a>
          ) and the MLH Privacy Policy (
          <a
            href='https://mlh.io/privacy'
            target='_blank'
            rel='noreferrer'
            className='text-blue-button'
          >
            https://mlh.io/privacy
          </a>
          ).
        </p>
      </div>,
    ],
    [{ inputType: "radio", field: "mlh_data_sharing", options: ["Yes"] }],
  ],

  // Step 3
  [[]],
]
