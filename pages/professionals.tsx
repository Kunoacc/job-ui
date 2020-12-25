import Layout from "../components/Layout"
import Menu from '../components/Menu'
import { v1 } from "uuid"
import { useSWRInfinite } from "swr"
import api from "../api"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { NextPageContext } from "next"
import PersonCard from "../components/PersonCard"
import PersonLoader from "../components/Loaders/PersonLoader"
import { PersonResult } from "../interfaces/search.interface"
import { AnimatePresence, motion, useViewportScroll } from "framer-motion"
import { createStandaloneToast, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import AsyncSelect from 'react-select/async'

export default function Professionals({ initialQuery }) {

  const { push, query, pathname } = useRouter()

  const [ search, setSearch ] = useState(initialQuery?.q ?? query?.q)
  const handleSearchUpdate = (s: string) => setSearch(s)

  const [data, setData ] = useState([] as PersonResult[])
  const handleDataSet = (newData: PersonResult[]) => setData(newData)

  const [ total, setTotal ] = useState(0)
  const handleTotalUpdate = (s: number) => setTotal(s)

  const [ skills, setSkills ] = useState(decodeURI(initialQuery?.filter ?? query?.filter) || [])
  const handleSkillsUpdate = (skill: []) => setSkills(skill)
  
  const [ offset, setOffset ] = useState(0)
  const handleOffsetUpdate = (s: number) => setOffset(s)

  const [ fetchKey, setFetchKey ] = useState(v1())
  const handleFetchKeyUpdate = () => setFetchKey(v1())

  const useToast = createStandaloneToast()

  const [ checkBoxState, setCheckBoxState ] = useState([])
  const updateCheckBoxState = (event: ChangeEvent<HTMLInputElement>) => {
    const arrayCopy = new Array(...checkBoxState)
    if (checkBoxState.includes(event.target.value)) {
      setCheckBoxState(arrayCopy.filter(x => x !== event.target.value))
    } else {
      if (checkBoxState.length >= 2) {
        useToast({
          title: 'Yikes',
          description: `It looks like you're trying to select more than 2 users. You can only compare 2 users at the moment`,
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      } else {
        setCheckBoxState([...arrayCopy, event.target.value])
      }
    }
  }

  const [ filters, setFilters ] = useState([] as string[])
  const getFilterOptions = (input: string) => new Promise(async (resolve) => {
    const response = await api.loadFilterOptions(input)
    return resolve(response.map(filter => ({
      label: filter.term,
      value: filter.term
    })))
  })

  useEffect(() => {
    if (search) {
      push(`${pathname}?q=${encodeURI(search)}${filters.length > 0 ? '&filter='+encodeURI(filters as unknown as string) : ``}`, undefined , { shallow: true })
      setCheckBoxState([])
    }
  }, [search])

  useEffect(() => {
    handleFetchKeyUpdate()
  }, [query?.q])

  const { scrollYProgress } = useViewportScroll()
  const [ shouldPadCompare, setShouldPadCompare ] = useState(false)
    
  scrollYProgress.onChange(val => {
    setShouldPadCompare(val > 0.95)
  })

  

  const { error, data: apiData, setSize, size } = useSWRInfinite( index => query?.q ? `${fetchKey}/${index}` : null,
    (offset: string) => api.searchPerson(search, (parseInt(offset.split('/')[1]) * 10).toString(), filters),
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

  useEffect(() => {
    console.log(filters)
    push(`${pathname}${search ? '?q=' + encodeURI(search) : ''}${filters.length > 0 ? `${search ? `&` : `?`}filter=`+encodeURI(filters as unknown as string) : ``}`, undefined , { shallow: true })
    if (search) {
      handleFetchKeyUpdate()
    }
  }, [filters])

  const handleFiltersSet = (event: any) => {
    setFilters(event?.map((x: any) => x.value) || [])
  }
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Menu className="bg-white pb-2" />
        <div className="bg-teal-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between flex items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Professionals
              </h2>
              <p className="mt-5 text-xl text-gray-400">Find the best individuals to start building on hacking out on
                your next big idea!</p>
            </div>
            <div className="w-full max-w-xs">
              <div className="flex-shrink-0 mt-10 lg:mt-0">
                <AsyncSelect isMulti cacheOptions defaultOptions={filters} loadOptions={getFilterOptions} onChange={handleFiltersSet}></AsyncSelect>
              </div>
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
           } className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full">

            {data.map((person) => <PersonCard person={person} checkBoxState={checkBoxState} toggleCheckBoxState={updateCheckBoxState} key={v1()}></PersonCard>) }

            {size > 0 && apiData && typeof apiData[size-1] === 'undefined' && 
            <div className={`flex justify-center items-center py-4 sm:col-span-${2 - (data.length % 2)} md:col-span-${3 - (data.length % 3)} lg:col-span-${4 - (data.length % 4)}`}>
              <Spinner></Spinner>
            </div>}
          </motion.ul>)
          || 
          apiData && data?.length < 1 && <h2 className="text-3xl text-gray-500 py-20 text-center">No search results for <b>"{search}"</b></h2>
          : 
          (<h2 className="text-5xl font-semibold text-gray-500 py-20 text-center">Search to get started</h2>)}
          {
            search && !apiData && <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full">
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
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

      {checkBoxState.length > 0 && <Link href={{
          pathname: checkBoxState.length > 1 ? `/compare/${checkBoxState[0]}/${checkBoxState[1]}` : pathname + '?q=' + query?.q,
          query: checkBoxState.length > 1 ? {q: encodeURI(filters as unknown as string)} : {}
          }}>
          <a
            key={v1()}
            className={`fixed ${shouldPadCompare ? 'bottom-24' : 'bottom-5'} w-max right-12 my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center ${checkBoxState.length > 0 && checkBoxState.length === 2 || 'opacity-50 cursor-not-allowed'}`}>
            Compare users
          </a>
      </Link>}
      
    </Layout>
  )
}

Professionals.getInitialProps= async ({ query }: NextPageContext) => {
  console.log(query)
  return { initialQuery: query }
}