import React, { useEffect, useState } from "react"
import { getApplication } from "../../../../utils/apis/firebase"
import useAuth from "../../../../hooks/useAuth"

const Submitted = () => {
  const {
    auth: { user },
  } = useAuth()
  // NOTE: Type is any because we don't know that the application will adhere to
  // the most updated schema
  const [application, setApplication] = useState<any>()

  useEffect(() => {
    const checkAppSub = async () => {
      try {
        if (!user) throw new Error("No user provided")
        const _application = await getApplication(user)
        setApplication(_application)
      } catch (err) {
        console.error(err)
      }
    }
    checkAppSub()
  }, [])

  return (
    <pre className='rounded-xl bg-white/10 p-5 text-sm'>
      {JSON.stringify(application, null, 2)}
    </pre>
  )
}

export default Submitted
