import { Input } from '@chakra-ui/react'
import Head from 'next/head'
import Menu from '../components/Menu'

export default function Home() {
  return (
    <div className="w-full">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mr-auto min-h-screen flex">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="50,0 100,0 100,100 0,100" />
            </svg>
            <Menu></Menu>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:mt-0 lg:px-8 h-full flex items-center">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Your one stop to </span>
                  <span className="block xl:inline">finding <span className="text-teal-600">opportunities</span> and hiring <span className="text-teal-600">professionals</span></span>
                </h1>
                <p
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Torre UI is a Job hub used for finding the latest and greatest oppurtunities across various fields as well as finding and hiring the most skilled and seasoned professionals in all fields.
                </p>
                <div className="xl:absolute mt-2 w-full transform xl:translate-x-2/3 relative">
                  <input placeholder="Search here..." className="border-b-2 border-t border-r border-l border-gray-300 w-full focus:border-teal-500 focus:ring-teal-500 outline-none text-2xl p-3 rounded transition-all ease-in duration-150 placeholder-gray-300 mt-10"/>
                  <button className="absolute items-center justify-center px-8 py-1 border border-transparent font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-2 md:px-10 right-0 mr-3 bottom-0 mb-3 text-sm">Search</button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""/>
        </div>
      </div>

    </div>
  )
}
