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
import { motion, useViewportScroll } from "framer-motion"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import AsyncSelect from "react-select/async"
import { debounce, useToast } from "../utils"

enum IsFirstLoad { 
  yes = "yes",
  no  = "no",
  //@ts-ignore
  notSet = null 
}
export default function Professionals({ initialQuery }) {

  const { push, query, pathname } = useRouter()
  const { onClose, onOpen, isOpen } = useDisclosure()

  const [ search, setSearch ] = useState(initialQuery?.q ?? query?.q)
  const handleSearchUpdate = (s: string) => setSearch(s)

  const [data, setData ] = useState([] as PersonResult[])
  const handleDataSet = (newData: PersonResult[]) => setData(newData)

  const [ total, setTotal ] = useState(0)
  const handleTotalUpdate = (s: number) => setTotal(s)

  const [ filters, setFilters ] = useState((initialQuery?.skills ?? query?.skills)?.split(',') || [])
  const handleFiltersSet = (event: any) => {
    setFilters(event?.map((x: any) => x.value) || [])
  }
  const getFilterOptions = (input: string) => new Promise(async (resolve) => {
    const response = await api.loadFilterOptions(input)
    return resolve(response.map(filter => ({
      label: filter.term,
      value: filter.term
    })))
  })

  const [ offset, setOffset ] = useState(0)
  const handleOffsetUpdate = (s: number) => setOffset(s)

  const [ fetchKey, setFetchKey ] = useState(v1())
  const handleFetchKeyUpdate = () => setFetchKey(v1())

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

  useEffect(() => {
    push(`${pathname}${search ? `?q=${encodeURI(search)}` : ``}${filters.length > 0 ? `${search ? `&` : `?`}skills=`+encodeURI(filters as unknown as string) : ``}`, undefined , { shallow: true })
    setCheckBoxState([])
  }, [search])

  useEffect(() => {
    handleFetchKeyUpdate()
  }, [query?.q, query?.skills])

  const { scrollYProgress } = useViewportScroll()
  const [ shouldPadCompare, setShouldPadCompare ] = useState(false)
    
  scrollYProgress.onChange(val => {
    setShouldPadCompare(val > 0.95)
  })

  const { error, data: apiData, setSize, size } = useSWRInfinite( index => query?.q || filters.length > 0 ? `${fetchKey}/${index}` : null,
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
    push(`${pathname}${search ? '?q=' + encodeURI(search) : ''}${filters.length > 0 ? `${search ? `&` : `?`}skills=`+encodeURI(filters as unknown as string) : ``}`, undefined , { shallow: true })
    setCheckBoxState([])
  }, [filters])

  const [ isFirstLoad, setIsFirstLoad ] = useState(null)
  const isMobile = useBreakpointValue({ base: true, md: false})
  useEffect(() => {
    const loadLocalValue = localStorage.getItem('isFirstLoad')

    // @ts-ignore
    if (loadLocalValue === IsFirstLoad.notSet) {
      setIsFirstLoad(IsFirstLoad.yes)
    }

    if (loadLocalValue === IsFirstLoad.yes) {
      setIsFirstLoad(IsFirstLoad.no)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("isFirstLoad", isFirstLoad)
  }, [isFirstLoad])
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col text-center lg:text-left">
        <Menu className="bg-white pb-2" />
        <div className="bg-teal-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between flex flex-col lg:flex-row items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Professionals
              </h2>
              <p className="mt-5 text-xl text-gray-400">Find the best individuals to start building on hacking out on
                your next big idea!</p>
            </div>
            <div className="w-full max-w-xs">
              <div className="flex-shrink-0 mt-10 lg:mt-0">
                <AsyncSelect isMulti cacheOptions 
                  loadOptions={getFilterOptions} 
                  onChange={handleFiltersSet} 
                  defaultValue={filters.map(filter => ({label: filter, value: filter}))} 
                  defaultOptions={filters.map(filter => ({label: filter, value: filter}))}
                  placeholder="Select skill..."></AsyncSelect>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto -mt-16 flex flex-col">
          <input placeholder="Search here..."
            className="border-b-2 border-t border-r border-l border-gray-300 focus:border-teal-500 focus:ring-teal-500 outline-none text-2xl p-3 rounded transition-all ease-in duration-150 placeholder-gray-300 mt-10 w-5/6 md:w-3/4 lg:w-2/3 mx-auto" 
            onChange={e => handleSearchUpdate(e.target.value)}
            value={search}/>

          {search || filters.length > 0 ? 
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
           } className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full px-2 lg:px-0">

            {data.map((person) => <PersonCard person={person} checkBoxState={checkBoxState} toggleCheckBoxState={updateCheckBoxState} key={v1()}></PersonCard>) }

            {size > 0 && apiData && typeof apiData[size-1] === 'undefined' && 
            <div className={`flex justify-center items-center py-4 sm:col-span-${2 - (data.length % 2)} md:col-span-${3 - (data.length % 3)} lg:col-span-${4 - (data.length % 4)}`}>
              <Spinner></Spinner>
            </div>}
          </motion.ul>)
          || 
          apiData && data?.length < 1 && <h2 className="text-3xl text-gray-500 py-20 text-center">No search results for <b>"{search}"</b></h2>
          : 
          (<h2 className="text-5xl font-semibold text-gray-500 py-20 text-center">Search or select skill to get started</h2>)}
          {
            (search || filters.length > 0 ) && !apiData && <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 w-full px-2 lg:px-0">
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
            <PersonLoader></PersonLoader>
          </ul>
          }
        </div>
        {(search || filters.length > 0) && apiData && (<><p className="text-center mx-auto text-gray-500">viewing {data.length} of {total} results</p>
        <button onClick={e => setSize(size + 1)}
          disabled={data.length >= total}
          className={`my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center ${data.length < total || 'opacity-50 cursor-not-allowed'}`}>Load More </button>
          </>)}
        <div className="w-full py-1"></div>
      </div>

      {checkBoxState.length > 0 && checkBoxState.length < 2 && 
        <a
          key={v1()}
          onClick={e => useToast({
            title: 'Yikes',
            description: `You have to select 2 users to compare`,
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })}
          className={`fixed ${shouldPadCompare ? 'bottom-24' : 'bottom-5'} w-max right-12 my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center ${checkBoxState.length > 0 && checkBoxState.length === 2 || 'opacity-50 cursor-not-allowed'}`}>
          Compare users
        </a>
      }
      
      {checkBoxState.length > 1 && <Link href={{
          pathname: checkBoxState.length > 1 ? `/compare/${checkBoxState[0]}/${checkBoxState[1]}` : pathname + `${search ? '?q=' + encodeURI(search) : ''}${filters.length > 0 ? `${search ? `&` : `?`}skills=`+encodeURI(filters as unknown as string) : ``}`,
          query: checkBoxState.length > 1 ? {q: encodeURI(filters as unknown as string)} : {}
          }}>
          <a
            key={v1()}
            className={`fixed ${shouldPadCompare ? 'bottom-24' : 'bottom-5'} w-max right-12 my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center ${checkBoxState.length > 0 && checkBoxState.length === 2 || 'opacity-50 cursor-not-allowed'}`}>
            Compare users
          </a>
      </Link>}
      
      <Modal isOpen={isFirstLoad === IsFirstLoad.yes} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Heads Up!</ModalHeader>
          <ModalBody>
            You can compare professionals! {isMobile ? `use the checkboxes on the top right of each user's card to begin.` : `hover over a user to reveal the checkboxes. use the checkboxes to begin`}
          </ModalBody>
          <ModalFooter>
          <button
          onClick={e => setIsFirstLoad(IsFirstLoad.no)}
            className="w-max mx-auto rounded-md right-12 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 text-center">
            Got It!
          </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
}

Professionals.getInitialProps= async ({ query }: NextPageContext) => {
  return { initialQuery: query }
}