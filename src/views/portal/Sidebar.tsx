import React, { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../utils/string"
import { Link, Outlet, useLocation } from "react-router-dom"
import CruzHacksLogo from "../../assets/logos/CruzHacks - Orange.svg"
import useAuth from "../../hooks/useAuth"
import AvatarButton from "../../components/AvatarButton"

// const teams = [
//   { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
//   { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
//   { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
// ]

type NavigationItem = {
  name: string
  href: string
  icon: any // TODO: Fix this type
}

interface SidebarProps {
  navigation: NavigationItem[]
}

const Sidebar = ({ navigation }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    auth: { user, role },
  } = useAuth()

  const location = useLocation()
  const email = user?.email || ""

  // Higlight when in subnavigation
  const isActive = (item: NavigationItem) => {
    if (item.name === "Dashboard") {
      return location.pathname === item.href
    }

    return location.pathname.includes(item.href)
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-[#6b7280]/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-blue-imperial px-6 pb-2 ring-1 ring-white/10'>
                    <div className='mt-2 flex h-16 shrink-0 items-center'>
                      <Link to='/'>
                        <img
                          className='h-8 w-auto'
                          src={CruzHacksLogo}
                          alt='Your Company'
                        />
                      </Link>
                    </div>
                    <nav className='flex flex-1 flex-col'>
                      <ul className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul className='-mx-2 space-y-1'>
                            {navigation.map(item => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    isActive(item)
                                      ? "bg-blue-royal/60 font-semibold text-pink"
                                      : "hover:bg-blue-royal/60 hover:text-pink",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className='h-6 w-6 shrink-0'
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li>
                          <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Your teams
                          </div>
                          <ul className='-mx-2 mt-2 space-y-1'>
                            {teams.map(team => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                                    {team.initial}
                                  </span>
                                  <span className='truncate'>{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-blue-imperial px-6'>
            <div className='mt-2 flex h-16 shrink-0 items-center'>
              <Link to='/'>
                <img
                  className='h-8 w-auto'
                  src={CruzHacksLogo}
                  alt='Your Company'
                />
              </Link>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul className='-mx-2 space-y-1'>
                    {navigation.map(item => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            isActive(item)
                              ? "bg-blue-royal/60 font-semibold text-pink"
                              : "hover:bg-blue-royal/60 hover:text-pink",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                          )}
                        >
                          <item.icon
                            className='h-6 w-6 shrink-0'
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <div className='text-gray-400 text-xs font-semibold leading-6'>
                    Your teams
                  </div>
                  <ul className='-mx-2 mt-2 space-y-1'>
                    {teams.map(team => (
                      <li key={team.name}>
                        <Link
                          to={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                            {team.initial}
                          </span>
                          <span className='truncate'>{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className='-mx-3 mb-5 mt-auto'>
                  <AvatarButton email={user?.email || ""} direction={"left"} />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-blue-royal p-4 shadow-sm sm:px-6 lg:hidden'>
          <button
            type='button'
            className='text-gray-400 -m-2.5 p-2.5 lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 font-title text-sm font-semibold capitalize leading-6 text-white'>
            {role} Portal
          </div>
          <AvatarButton email={email} direction={"down"} />
        </div>

        <main className='py-10 lg:pl-72'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

export default Sidebar
