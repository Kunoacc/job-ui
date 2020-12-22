import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function Menu(){

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenuState = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <p className="text-xl font-bold text-teal-500">Torre UI</p>
                </a>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <button type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  id="main-menu" aria-haspopup="true" onClick={e => toggleMenuState()}>
                  <span className="sr-only">Open main menu</span>
                  {/*
                  <!-- Heroicon name: menu --> */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8 mr-5">
            <Link href="/professionals">
              <a className="font-medium text-gray-500 hover:text-gray-900">Professionals</a>
            </Link>
            <Link href="/opportunities">
              <a className="font-medium text-gray-500 hover:text-gray-900">Opportunities</a>
            </Link>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {
          isMenuOpen && (
            <motion.div 
              initial={{opacity: 0, scale: .95}} 
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: .95}}
              transition={{ duration: .15, type: "spring"}}
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-teal-500">Torre UI</p>
            </div>
            <div className="-mr-2">
              <button type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                onClick={e => toggleMenuState()}>
                <span className="sr-only">Close main menu</span>
                {/*
                <!-- Heroicon name: x --> */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
            <div className="px-2 pt-2 pb-3 space-y-1" role="none">
              <Link href="/professionals">
                <a
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem">Professionals</a>
              </Link>
              <Link href="/opportunities">
                <a
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem">Opportunities</a>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}