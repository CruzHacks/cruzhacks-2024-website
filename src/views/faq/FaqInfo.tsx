import React from "react"

const starterPack = (
  <a
    target='_blank'
    rel='noreferrer'
    href='https://github.com/CruzHacks/Cruzhacks-Hacker-Packs'
    className='text-blue'
  >
  &nbsp;starter packs
  </a>
)

export const FAQsInfo = [
  {
    question: "What should I bring?",
    answer: (
      <>
        Some essential things to bring include a laptop (with charger), an empty
        bag for swag, a change of clothes if you plan on spending the night, and
        a sleeping bag/blanket if you&apos;re not local to Santa Cruz!
      </>
    ),
  },
  {
    question: "What rules do I need to follow?",
    answer: (
      <>
        All CruzHacks 2023 participants will need to follow the{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
          className='text-blue'
        >
          MLH Code of Conduct
        </a>
        , the{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://docs.google.com/document/u/1/d/1298VyEqrSIvbzM3U8nvLQsLtY78Vi2mbndr3d5w0UKk/edit'
          className='text-blue'
        >
          CruzHacks 2023 Participant and Release Agreement
        </a>
        , the{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/CruzHacks/hackathon-rules/blob/master/Rules.md'
          className='text-blue'
        >
          CruzHacks 2023 Rules
        </a>
        , and the{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://docs.google.com/document/u/1/d/1aq7xN3c8t8AWS-yDBcvqu4EMYmw0025HAoCFuOVld7c/edit'
          className='text-blue'
        >
          CruzHacks 2023 COVID Safety Policy
        </a>
        .
      </>
    ),
  },
  {
    question: "What are the prize tracks?",
    answer: (
      <>
        CruzHacks 2023 offers 4 main prize tracks (Health Hacks, Justice Hacks,
        Sustainability Hacks, and Fintech Hacks). Hackers can submit their
        project to one of these 4 main prize tracks. We also offer 4 category
        prizes (Best Beginner, Best UI/UX, New Technologies, and Best Slug
        Hack). Hackers can submit their project to any number of these 4
        categories. There will also be sponsors hosting some of their own prize
        tracks. Hackers can submit their project to any number of sponsored
        prize tracks.
      </>
    ),
  },
  {
    question: "What are CruzPoints?",
    answer: (
      <>
        CruzPoints are CruzHacks 2023&apos;s point reward system for Hackers!
        For more information,{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://docs.google.com/document/d/1kExaZxBGb4VveTr6TDdAOKWLCM7E22OmGRxP4htBTok'
          className='text-blue'
        >
          click here
        </a>
        .
      </>
    ),
  },
  {
    question: "How many people can be on my team?",
    answer: (
    <>
      There is a maximum of 4 people per team.
    </>
    ),
  },
  {
    question: "What if I don't know how to code?",
    answer: (
    <>
      No experience is required, if you&apos;re stuck reach out to our
      mentors on slack to get some pointers. If you&apos;re looking to get 
      started, we&apos;ve provided some code {starterPack}. 
      Cruzhacks is all about learning and trying something new, be 
      sure to attend some of our workshops listed in the schedule!
    </>
    ),
  },
]
