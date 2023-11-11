import React from "react"
import { classNames, toUrlFriendly } from "../../../../utils/string"
import { useNavigate } from "react-router-dom"

type ApplicationStatus = "NEEDS REVIEW" | "DENIED" | "ACCEPTED"

const applications = [
  {
    appId: 1,
    status: "NEEDS REVIEW" as const,
    email: "monkey@gmail.com",
    timeSubmitted: "2021-09-01T12:00:00Z",
  },
  {
    appId: 2,
    status: "DENIED" as const,
    email: "test@gmail.com",
    timeSubmitted: "2021-09-01T12:00:00Z",
  },
  {
    appId: 3,
    status: "ACCEPTED" as const,
    email: "thedog@gmail.com",
    timeSubmitted: "2021-09-01T12:00:00Z",
  },
]

const formatTime = (time: string) => {
  const d = new Date(time)

  return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`
}

const AppStatus = ({ status }: { status: ApplicationStatus }) => {
  if (status === "DENIED") {
    return (
      <span className='inline-flex items-center rounded-md bg-error/50 px-2 py-1 text-xs font-medium text-error ring-1 ring-inset ring-error/20'>
        Denied
      </span>
    )
  }

  if (status === "ACCEPTED") {
    return (
      <span className='inline-flex items-center rounded-md bg-success/50 px-2 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20'>
        Accepted
      </span>
    )
  }

  return (
    <span className='inline-flex items-center rounded-md bg-gold/50 px-2 py-1 text-xs font-medium text-gold ring-1 ring-inset ring-gold/20'>
      Needs Review
    </span>
  )
}

const ApplicationsAdmin = () => {
  const isError = false
  const error = false
  const isLoading = false
  const navigate = useNavigate()

  const handleReviewApplication = (email: string) => {
    const email_friendly = encodeURIComponent(email)
    navigate(`/portal/admin/applications/review/${email_friendly}`)
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='font-title text-2xl font-semibold leading-6'>
            Applications
          </h1>
          <p className='text-gray-700 mt-2 text-sm'>
            Hacker applications for this years hackathon.
          </p>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <table className='min-w-full border-separate border-spacing-0'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-white/20 bg-blue-imperial/50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white backdrop-blur sm:pl-6 lg:pl-8'
                  >
                    Id
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-white/20 bg-blue-imperial/50 px-3 py-3.5 text-left text-sm font-semibold text-white backdrop-blur'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 hidden border-b border-white/20 bg-blue-imperial/50 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur sm:table-cell'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 hidden border-b border-white/20 bg-blue-imperial/50 px-3 py-3.5 text-left text-sm font-semibold text-white backdrop-blur sm:table-cell'
                  >
                    Time Submitted
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-white/20 bg-blue-imperial/50 py-3.5 pl-3 pr-4 backdrop-blur sm:pr-6 lg:pr-8'
                  >
                    <span className='sr-only'>Review Application</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isError &&
                  (!isLoading
                    ? applications &&
                      applications.map((application, applicationIdx) => (
                        <tr key={application.email}>
                          <td
                            className={classNames(
                              applicationIdx !== applications.length - 1
                                ? "border-b border-white/20"
                                : "",
                              "whitespace-nowrap py-4 pl-4 pr-3 font-subtext text-sm sm:pl-6 lg:pl-8"
                            )}
                          >
                            {application.appId}
                          </td>
                          <td
                            className={classNames(
                              applicationIdx !== applications.length - 1
                                ? "border-b border-white/20"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm font-medium"
                            )}
                          >
                            <AppStatus status={application.status} />
                          </td>
                          <td
                            className={classNames(
                              applicationIdx !== applications.length - 1
                                ? "border-b border-white/20"
                                : "",
                              "hidden whitespace-nowrap px-3 py-4 font-subtext text-sm md:table-cell"
                            )}
                          >
                            {application.email}
                          </td>
                          <td
                            className={classNames(
                              applicationIdx !== applications.length - 1
                                ? "border-b border-white/20"
                                : "",
                              "hidden whitespace-nowrap px-3 py-4 text-sm md:table-cell"
                            )}
                          >
                            {formatTime(application.timeSubmitted)}
                          </td>
                          <td
                            className={classNames(
                              applicationIdx !== applications.length - 1
                                ? "border-b border-white/20"
                                : "",
                              "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                            )}
                          >
                            <button
                              className='cursor-not-allowed text-pink/50'
                              onClick={() =>
                                handleReviewApplication(application.email)
                              }
                            >
                              Review Application
                              <span className='sr-only'>
                                , {application.email}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    : // Loading State
                      [...Array(5).keys()].map(i => (
                        <tr key={i}>
                          <td
                            key={i + 100}
                            className='hidden py-4 pl-4 pr-3 text-sm font-medium sm:table-cell sm:pl-6 lg:pl-8'
                          >
                            <div className='h-6 w-40 animate-pulse rounded bg-white/30 '></div>
                          </td>
                          <td key={i + 200} className='px-3 py-4'>
                            <div className='h-6 w-40 animate-pulse rounded bg-white/30 '></div>
                          </td>
                          <td key={i + 300} className='px-3 py-4'>
                            <div className='h-6 w-16 animate-pulse rounded bg-white/30 '></div>
                          </td>
                          <td
                            key={i + 400}
                            className='hidden px-3 py-4 sm:table-cell'
                          >
                            <div className='h-6 w-60 animate-pulse rounded bg-white/30 '></div>
                          </td>
                          <td className='relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8'>
                            <button className='cursor-not-allowed text-pink/50'>
                              Edit
                            </button>
                          </td>
                        </tr>
                      )))}
              </tbody>
            </table>
            {isError && (
              <div className='flex min-h-full w-full flex-col items-center justify-center bg-error/10 p-10'>
                <p className='font-subtext leading-8 text-error'>
                  Error while fetching :
                </p>
                <p className='break-all font-subtext leading-8 text-error'>
                  {JSON.stringify(error)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsAdmin
