import Layout from "../components/Layout"
import Menu from '../components/Menu'
import { v1 } from 'uuid'
import useSWR from 'swr'
import api from "../api"
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Professionals() {

  const { push, query, pathname, asPath, route } = useRouter()

  const [ search, setSearch ] = useState(query?.q as string)
  const handleSearchUpdate = (s: string) => setSearch(s)
  
  const [ offset, setOffset ] = useState(0)
  const handleOffsetUpdate = (s: number) => setOffset(s)

  const [ fetchKey, setFetchKey ] = useState(v1())
  const handleFetchKeyUpdate = () => setFetchKey(v1())

  useEffect(() => {
    if (search) {
      push(`${pathname}?q=${encodeURI(search)}`, undefined , { shallow: true })
    }
  }, [search])

  useEffect(() => {
    handleFetchKeyUpdate()
  }, [query?.q])

  const { data, error } = useSWR(query?.q ? fetchKey : null, () => api.searchPerson(search, offset as unknown as string))
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <Menu className="bg-white pb-2" />
        <div className="bg-teal-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Professionals
              </h2>
              <p className="mt-5 text-xl text-gray-400">Find the best individuals to start building on hacking out on
                your next big idea!</p>
            </div>
            <div className="mt-10 w-full max-w-xs">
              <label htmlFor="currency" className="block text-base font-medium text-gray-300">Currency</label>
              <div className="mt-1.5 relative">
                <select id="currency" name="currency"
                  className="appearance-none block w-full bg-none bg-white border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-teal-800 focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm">
                  
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                  {/* Heroicon name: chevron-down */}
                  <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto -mt-16 flex flex-col">
          <input placeholder="Search here..."
            className="border-b-2 border-t border-r border-l border-gray-300 focus:border-teal-500 focus:ring-teal-500 outline-none text-2xl p-3 rounded transition-all ease-in duration-150 placeholder-gray-300 mt-10 w-5/6 md:w-3/4 lg:w-2/3 mx-auto" 
            onChange={e => handleSearchUpdate(e.target.value)}/>

          {search ? 
           data?.results.length > 0 && (<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full">
            {data.results.map((person) => <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" key={v1()}>
              <div className="flex-1 flex flex-col p-8">
                <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
                  src={person.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(person.username)}?d=identicon`}
                  alt="" />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 text-sm">{person.professionalHeadline}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span
                      className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Admin</span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <Link href={`/professional/${person.username}`}>
                      <a
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                        <span className="ml-3">View</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </li>) }
          </ul>)  || data?.results.length < 1 && <h2 className="text-3xl text-gray-500 py-20 text-center">No search results for <b>"{search}"</b></h2>: 
          
          (
            <h2 className="text-5xl font-semibold text-gray-500 py-20 text-center">Search to get started</h2>
          )}

          {
            search && !data && <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full">
            <Loader></Loader>
            <Loader></Loader>
            <Loader></Loader>
            <Loader></Loader>
          </ul>
          }

        </div>
      </div>
    </Layout>
  )
}

function Loader(){
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex flex-col p-8 items-center">
        <SkeletonCircle size="32"></SkeletonCircle>
        <Skeleton height="16px" className="mt-6 w-full"></Skeleton>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <Skeleton height="10px" className="mt-2"></Skeleton>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <Skeleton height="12px" className="mt-2" startColor="green.100" endColor="green.500">
            <span
              className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Admin</span>
            </Skeleton>
          </dd>
        </dl>
      </div>
    </li>
  )
}