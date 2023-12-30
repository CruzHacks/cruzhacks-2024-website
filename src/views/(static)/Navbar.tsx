import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import CruzHacksLogo from "../../assets/logos/CruzHacks - Blue.svg"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import AvatarButton from "../../components/AvatarButton"

const Navbar = () => {
  const {
    isAuthenticated,
    auth: { user },
  } = useAuth()

  return (
    <>
      <div className='fixed z-[300] flex w-screen justify-center bg-blue-imperial/80 backdrop-blur-md'>
        <div className='relative flex h-10 w-full max-w-7xl items-center justify-between px-10 py-8 pt-10 font-subtext lowercase md:text-xl lg:justify-center'>
          <Link to='/#landing' className='left-10 lg:absolute'>
            <img
              className='hidden h-8 w-auto md:block'
              src={CruzHacksLogo}
              alt='CruzHacks logo'
            />
          </Link>
          <div className='flex grow items-center justify-evenly font-light uppercase md:grow-0 md:gap-10'>
            <Link
              to='/#about'
              className='transition-all hover:font-bold hover:text-pink'
            >
              ABOUT
            </Link>
            <Link
              to='/#prize-tracks'
              className='transition-all hover:font-bold hover:text-pink'
            >
              Prize Tracks
            </Link>
            <Link
              to='/support'
              className='transition-all hover:font-bold hover:text-pink '
            >
              Support
            </Link>
          </div>

          {/* Desktop MLH Trust Badge */}
          <a
            id='mlh-trust-badge'
            className='absolute right-24 top-0 hidden w-20 md:block'
            // style='display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000'
            href='https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=blue'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-blue.svg'
              alt='Major League Hacking 2024 Hackathon Season'
              className='w-full'
            />
          </a>

          <div className='right-10 lg:absolute'>
            {!isAuthenticated ? (
              <Link
                to='/login'
                className='md:text-blue-white z-10 flex items-center justify-center gap-2 rounded-full px-3 py-1 font-title text-sm text-white shadow-lg md:w-36 md:bg-[#3d30cb] md:text-gold'
              >
                <span className='hidden md:block'>Login</span>
                <ArrowRightOnRectangleIcon className='inline h-5 w-auto' />
              </Link>
            ) : (
              <AvatarButton
                nav={[{ name: "Portal", href: "/portal" }]}
                email={user?.email || ""}
                direction='down'
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile MLH Trust Badge */}
      <a
        id='mlh-trust-badge'
        className='absolute right-5 top-8 z-10 block w-20 md:hidden'
        // style='display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000'
        href='https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=blue'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-blue.svg'
          alt='Major League Hacking 2024 Hackathon Season'
          className='w-full'
        />
      </a>
    </>
  )
}

export default Navbar
