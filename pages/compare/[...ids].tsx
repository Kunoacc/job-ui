import Layout from "../../components/Layout"
import Menu from "../../components/Menu"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { v1 } from "uuid"
import { ComparePeople, PeopleComparisonData } from "../../interfaces/compare.interface"
import useSWR from "swr"
import api from "../../api"
import { numberFormat } from "../../utils"

export default function ComparePage({ first, second, query: initialQuery }: {
  first: string,
  second: string,
  query?: string
}){

  const { query } = useRouter()
  
  const [ fetchKey, setFetchKey ] = useState(v1())
  const updateFetchKey = () => setFetchKey(v1())

  const [ persons, setPersons ] = useState(null as ComparePeople)
  const [ preferredPerson, setPreferredPerson ] = useState(null as PeopleComparisonData)
  const [ otherPerson, setOtherPerson ] = useState(null as PeopleComparisonData)

  const { data, error } = useSWR( fetchKey, () => api.compareUsers({ first, second }, query?.q as string[]), {
    onSuccess(data, key) {
      setPersons(data)
    }
  })

  useEffect(() => {
    if (persons) {
      console.log(persons);
      setPreferredPerson(persons.compared[persons.preferredIndex])
      setOtherPerson(persons.compared[Object.keys(persons.compared).filter(x => x !== persons.preferredIndex)[0]])
    }
  }, [persons])

  if (!data && !error) return <Generating></Generating> 

  if (error) return <Error error={error}></Error>

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col">
      <Menu className="bg-white pb-2">
          <div className="mx-auto px-4 sm:px-6">
            <div className="border-t border-gray-200 py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <div className="flex sm:hidden">
                  <Link href="/opportunities">
                  <a
                    className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {/* Heroicon name: arrow-narrow-left */}
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd" />
                    </svg>
                    <span>Back to Opportunities</span>
                  </a>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <ol className="flex items-center space-x-4">
                    <li>
                      <div>
                        <Link href="/">
                        <a className="text-gray-400 hover:text-gray-500">
                          {/* Heroicon name: home */}
                          <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path
                              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          <span className="sr-only">Home</span>
                        </a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <Link href="/opportunities">
                          <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Opportunities</a>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <span aria-current="page"
                          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Comparing {preferredPerson.name.split(' ')[0]} & {otherPerson.name.split(' ')[0]}</span>
                      </div>
                    </li>
                  </ol>
                </div>
              </nav>
            </div>
          </div>
        </Menu>

        <div className="bg-teal-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between items-center">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-xl font-semibold text-gray-200 sm:tracking-tight">Comparing professionals
              </h2>
              <p className="mt-5 text-4xl font-extrabold text-white m:text-5xl sm:tracking-tight lg:text-6xl">Comparing {preferredPerson.name.split(' ')[0]} & {otherPerson.name.split(' ')[0]}</p>
            </div>
            <div className="w-full max-w-xs">
            <div className="flex-shrink-0 mt-10 lg:mt-0">
              <div className="flex overflow-hidden py-2 px-2 justify-center lg:justify-end">
                <img className="inline-block h-36 w-36 rounded-full ring-2 ring-white" src={preferredPerson?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(preferredPerson.username)}?d=identicon`} alt="" />
                <img className="-ml-6 inline-block h-36 w-36 rounded-full ring-2 ring-white" src={otherPerson?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(otherPerson.username)}?d=identicon`} alt="" />
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
            <div className="mx-auto text-base max-w-prose lg:max-w-none">
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Meet preference 1</h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{preferredPerson?.name}</h3>
            </div>
            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="relative lg:row-start-1 lg:col-start-2">
                <svg className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20" width={404} height={384} fill="none" viewBox="0 0 404 384" aria-hidden="true">
                  <defs>
                    <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                </svg>
                <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <img className="rounded-lg shadow-lg object-cover object-center" src={preferredPerson?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(preferredPerson.username)}?d=identicon`} alt="Preferred Person Profile Image" width={1184} height={1376} />
                    </div>
                  </figure>
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                {preferredPerson?.bio && <div className="text-base max-w-prose mx-auto lg:max-w-none">
                  <p className="text-lg text-gray-500">{preferredPerson?.bio}</p>
                </div>}

                <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1 grid gap-y-4">
                  <p>{preferredPerson?.headline}</p>
                  <p>{preferredPerson?.employmentDuration}</p>
                  <p>{preferredPerson?.numberOfOpportunities}</p>
                  <p>{preferredPerson?.skillsBreakdown}</p>
                  <p>{preferredPerson?.name}'s longest standing experience has been at {preferredPerson?.longestExperience?.organizations[0]?.name} as {preferredPerson?.longestExperience?.name} where he/she has worked for {parseInt(preferredPerson?.longestExperience?.toYear || new Date().getFullYear()) - parseInt(preferredPerson?.longestExperience?.fromYear)} years.</p>
                  <div>
                    <p>Their top {preferredPerson?.topFiveSkills?.length} skills include:</p>
                    <div className="mt-1 flex flex-wrap flex-row">
                      {
                        preferredPerson.topFiveSkills.map(skill => 
                        <span className="inline-flex w-max items-center px-4 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 my-2 mx-2" key={v1()}>
                          {skill?.name}
                        </span>
                        )
                      }
                    </div>
                  </div>
                  <p>Their desired minimum compensation is {preferredPerson?.preferredJobCompensationCurrency}{numberFormat(preferredPerson?.preferredJobCompensationAmount)} {preferredPerson.preferredJobCompensationCycle} for any jobs/roles they'd be brought on to handle</p>
                  <Link href={`/professional/${preferredPerson.username}`}>
                  <a
                    className={`my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center`}>View {preferredPerson?.name?.split(' ')[0]}'s Profile</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 right-3/4 w-screen" />
            <div className="mx-auto text-base max-w-prose lg:max-w-none text-right relative z-10">
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Meet Preference 2</h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{otherPerson?.name}</h3>
            </div>
            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="relative lg:row-start-1 lg:col-start-1">
                <svg className="hidden lg:block absolute top-0 left-0 -mt-20 -ml-20" width={404} height={384} fill="none" viewBox="0 0 404 384" aria-hidden="true">
                  <defs>
                    <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                </svg>
                <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <img className="rounded-lg shadow-lg object-cover object-center" src={otherPerson?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(otherPerson.username)}?d=identicon`} alt="Other Person's Image" width={1184} height={1376} />
                    </div>
                  </figure>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 z-10 relative">
              {otherPerson?.bio && <div className="text-base max-w-prose mx-auto lg:max-w-none">
                  <p className="text-lg text-gray-500">{otherPerson?.bio}</p>
                </div>}

                <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1 grid gap-y-4">
                  <p>{otherPerson?.headline}</p>
                  <p>{otherPerson?.employmentDuration}</p>
                  <p>{otherPerson?.numberOfOpportunities}</p>
                  <p>{otherPerson?.skillsBreakdown}</p>
                  <p>{otherPerson?.name}'s longest standing experience has been at {otherPerson?.longestExperience?.organizations[0]?.name} as {otherPerson?.longestExperience?.name} where he/she has worked for {parseInt(otherPerson?.longestExperience?.toYear || new Date().getFullYear()) - parseInt(otherPerson?.longestExperience?.fromYear)} years.</p>
                  <div>
                    <p>Their top {otherPerson?.topFiveSkills?.length} skills include:</p>
                    <div className="mt-1 flex flex-wrap flex-row">
                      {
                        otherPerson.topFiveSkills.map(skill => 
                        <span className="inline-flex w-max items-center px-4 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 my-2 mx-2" key={v1()}>
                          {skill?.name}
                        </span>
                        )
                      }
                    </div>
                  </div>
                  <p>Their desired minimum compensation is {otherPerson?.preferredJobCompensationCurrency}{numberFormat(otherPerson?.preferredJobCompensationAmount)} {otherPerson?.preferredJobCompensationCycle} for any jobs/roles they'd be brought on to handle</p>
                  <Link href={`/professional/${otherPerson.username}`}>
                  <a
                    className={`my-5 py-3 px-5 bg-teal-500 border-b-2 rounded-2 border-teal-700 text-white hover:bg-teal-600 hover:border-teal-900 transition-colors ease duration-150 container mx-auto text-center`}>View {otherPerson?.name?.split(' ')[0]}'s Profile</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function Generating(){
  return (
    <div className="min-h-screen absolute w-full top-0 left-0 flex flex-col items-center justify-center bg-gray-200">
      <Spinner></Spinner>
      <h3 className="font-semibold text-2xl mt-4">
        Crunching Data...
      </h3>
    </div>
  )
}

function Error({ error }){
  return (
    <div className="min-h-screen absolute w-full top-0 left-0 flex items-center justify-center bg-gray-200">
      <h3 className="font-normal text-2xl">
        {error?.message}
      </h3>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.ids.length < 2) {
    return {
      props: {},
      notFound: true
    }
  } else {
    return {
      props: {
        first: params?.ids[0],
        second: params?.ids[1]
      }
    }
  }
}

// ComparePage.getInitialProps = async ({ query: initialQuery }: NextPageContext) => {
//   return { query: initialQuery?.q}
// }

