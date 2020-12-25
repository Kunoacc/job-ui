import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { v1 } from "uuid";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import AsyncSelect from "react-select/async"
import api from "../api";
import { useToast } from "../utils";

export default function Home() {

  const { push } = useRouter()

  const searchTypeOptions = ['Opportunities', 'Professionals']
  const [ searchType, setSearchType ] = useState(searchTypeOptions[0])
  const handleSearchTypeUpdate = (event: ChangeEvent<HTMLSelectElement>) => setSearchType(event.target.value)

  const [ search, setSearch ] = useState('')
  const handleSearchUpdate = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

  const handleSearchEvent = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (search) {
        push({
          pathname: `/${searchType.toLowerCase()}`,
          query: {
            q: search
          }
        })
      } else {
        useToast({
          title: 'Sorry',
          status: 'error',
          description: `You'll have to enter some text to be able to search for a ${searchType === searchTypeOptions[0] ? 'role' : 'name'}`,
          duration: 2000,
          position: 'top-right'
        })
      }
      
    }
  }
  
  const handleFiltersSet = (event: any) => {
    push({
      pathname: `/${searchType.toLowerCase()}`,
      query: {
        skills: event.value
      }
    })
  }

  const getFilterOptions = (input: string) => new Promise(async (resolve) => {
    const response = await api.loadFilterOptions(input)
    return resolve(response.map(filter => ({
      label: filter.term,
      value: filter.term
    })))
  })

  return (
    <Layout isHome={true}>
      <div className="w-full">
        <div className="relative bg-white overflow-hidden min-h-screen">
          <div className="max-w-7xl mr-auto min-h-screen flex">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 100,100 0,100" />
              </svg>
              <Menu isHome={true}></Menu>
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:mt-0 lg:px-8 h-full flex items-center">
                <div className="sm:text-center lg:text-left -mt-16">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Your one stop to </span>
                    <span className="block xl:inline">finding <span className="text-teal-600">opportunities</span> and
                      hiring <span className="text-teal-600">professionals</span></span>
                  </h1>
                  <p
                    className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Torre UI is a Job hub used for finding the latest and greatest oppurtunities across various fields
                    as well as finding and hiring the most skilled and seasoned professionals in all fields.
                  </p>
                  <form onKeyPress={handleSearchEvent}>
                    <div className="xl:absolute w-full transform xl:translate-x-2/3 relative flex flex-col-reverse justify-center items-center mt-12">
                    {searchType === searchTypeOptions[1] && <div className="xl:absolute relative w-full xl:w-1/4 bottom-2 left-1 flex flex-col-reverse xl:flex-row justify-between items-center">
                        <AsyncSelect classNamePrefix="select-container" 
                          className="xl:flex-grow w-full xl:w-auto border-b-2 border-t border-r border-l border-gray-300 rounded-md py-1 xl:border-0 xl:py-0" 
                          placeholder="Select Skill..." 
                          loadOptions={getFilterOptions}
                          onChange={handleFiltersSet}>
                        </AsyncSelect>
                        <p className="mt-5 xl:mt-0 py-2 xl:py-0 -mr-0 xl:-mr-3 mb-2 xl:mb-0"> OR </p>
                      </div>}
                      <input placeholder={`Search For ${searchType === searchTypeOptions[0] ? `Role...` : `Name...`}`}
                        className={`border-b-2 border-t border-r border-l border-gray-300 w-full focus:border-teal-500 focus:ring-teal-500 outline-none text-2xl py-3 px-5 ${searchType === searchTypeOptions[1] ? `xl:pl-52` : ``} rounded transition-all ease-in duration-150 placeholder-gray-300`}
                        onChange={handleSearchUpdate}
                        value={search} />
                      <div className="absolute xl:inset-y-0 right-0 top-5 flex items-end justify-end self-end">
                        <label htmlFor="search_type" className="sr-only">Search Type</label>
                        <select id="search_type" name="search_type" className="focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-2 pr-12 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        onChange={handleSearchTypeUpdate}
                        value={searchType}>
                          {searchTypeOptions.map( option => <option value={option} key={v1()}>{option}</option>)}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="" />
          </div>
        </div>
      </div>
    </Layout>
    
  )
}
