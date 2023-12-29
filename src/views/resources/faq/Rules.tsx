import React from "react"
import Button from "../../../components/Button"

const Rules: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 rounded-3xl bg-[#4659FF]/10 p-10'>
      <h1 className='font-title text-2xl'>Event Info</h1>

      <div className='md:px-10'>
        <p className='mb-10 font-subtext'>
          Cruzhacks values the importance of a safe and all-inclusive space. We
          welcome students from all backgrounds. Review our rules and policies
          below.
        </p>

        <div className='flex flex-col items-stretch gap-5'>
          <Button
            text='CruzHacks 2024 Rules'
            link='https://github.com/CruzHacks/hackathon-rules/blob/master/Rules.md'
            type='clear'
          />
          <Button
            text='Code of Conduct 2024 Rules'
            link='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
            type='clear'
          />
          <Button
            text='COVID Safety Policy'
            link='https://docs.google.com/document/u/1/d/1aq7xN3c8t8AWS-yDBcvqu4EMYmw0025HAoCFuOVld7c'
            type='clear'
          />
          <Button
            text='Participant & Release Agreement'
            link='https://docs.google.com/document/d/1298VyEqrSIvbzM3U8nvLQsLtY78Vi2mbndr3d5w0UKk'
            type='clear'
          />
        </div>
      </div>
    </div>
  )
}

export default Rules
