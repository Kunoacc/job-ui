import Layout from "../components/Layout"
import Menu from '../components/Menu'
import { v1 } from "uuid"
import { useSWRInfinite } from "swr"
import api from "../api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NextPageContext } from "next"
import PersonLoader from "../components/Loaders/PersonLoader"
import { OpportunityResult } from "../interfaces/search.interface"
import { motion } from "framer-motion"
import { Spinner } from "@chakra-ui/react"
import OpportunityCard from "../components/OpportunityCard"
import OpportunityLoader from "../components/Loaders/OpportunityLoader"

export default function Opportunities({ initialQuery }) {

  const { push, query, pathname } = useRouter()

  const [ search, setSearch ] = useState(initialQuery?.q ?? query?.q)
  const handleSearchUpdate = (s: string) => setSearch(s)

  const [data, setData ] = useState([] as OpportunityResult[])
  const handleDataSet = (newData: OpportunityResult[]) => setData(newData)

  const [ total, setTotal ] = useState(0)
  const handleTotalUpdate = (s: number) => setTotal(s)
  
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

  const { error, data: apiData, setSize, size } = useSWRInfinite( index => query?.q ? `${fetchKey}/${index}` : null,
    (offset: string) => api.searchOpportunity(search, (parseInt(offset.split('/')[1]) * 10).toString()),
    {
      onSuccess(data, key){
        const fetcherKey = key.replace(/"/g, "").split('/')[1]
        console.log(key, fetcherKey, data)
        if (data.length < 2) {
          handleTotalUpdate(data[0].total)
        }
        handleDataSet([...data.map(result => result.results)].flat())
        handleOffsetUpdate(data[data.length - 1].offset + 10)
      }
    }
  )
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Menu className="bg-white pb-2" />
          <div className="bg-teal-700">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Opportunities
                </h2>
                <p className="mt-5 text-xl text-gray-400">Find your next possible gig, job, or project to keep yourself occupied and sharpen your expertise</p>
              </div>
            </div>
          </div>
        <div className="container mx-auto -mt-16 flex flex-col">
          <input placeholder="Search here..."
            className="border-b-2 border-t border-r border-l border-gray-300 focus:border-teal-500 focus:ring-teal-500 outline-none text-2xl p-3 rounded transition-all ease-in duration-150 placeholder-gray-300 mt-10 w-5/6 md:w-3/4 lg:w-2/3 mx-auto" 
            onChange={e => handleSearchUpdate(e.target.value)}
            value={search}/>

          {search ? 
            apiData && data?.length > 0 && 
           (<motion.ul variants={
             {
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
             }
           } className="divide-y divide-gray-200 grid grid-cols-1 gap-y-6 my-10">

            {data.map((opportunity) => <OpportunityCard opportunity={opportunity} key={v1()}></OpportunityCard>) }

            {size > 0 && apiData && typeof apiData[size-1] === 'undefined' && 
            <div className={`flex justify-center items-center py-4`}>
              <Spinner></Spinner>
            </div>}
          </motion.ul>)  
          || 
          apiData && data?.length < 1 && <h2 className="text-3xl text-gray-500 py-20 text-center">No search results for <b>"{search}"</b></h2>
          : 
          (<h2 className="text-5xl font-semibold text-gray-500 py-20 text-center">Search to get started</h2>)}
          {
            search && !apiData && <ul className="divide-y divide-gray-200 grid grid-cols-1 gap-y-6 my-10">
            <OpportunityLoader></OpportunityLoader>
            <OpportunityLoader></OpportunityLoader>
            <OpportunityLoader></OpportunityLoader>
          </ul>
          }
        </div>
        {search && apiData && (<><p className="text-center mx-auto text-gray-500">viewing {data.length} of {total} results</p>
        <button onClick={e => setSize(size + 1)} 
          disabled={data.length >= total}
          className={`my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center ${data.length < total || 'opacity-50 cursor-not-allowed'}`}>Load More </button>
          </>)}
        <div className="w-full py-1"></div>
      </div>
      
    </Layout>
  )
}

Opportunities.getInitialProps= async ({ query }: NextPageContext) => {
  return { initialQuery: query }
}