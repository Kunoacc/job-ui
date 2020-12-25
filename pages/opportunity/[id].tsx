import { GetServerSideProps } from "next";
import api from "../../api";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import { ApiError } from "../../interfaces/error.interface";
import Link from 'next/link'
import useSWR from "swr";
import { useState } from "react";
import { v1 } from "uuid";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { Opportunity } from "../../interfaces/opportunity.interface";

export default function OpportunityDetails({ opportunity }: {
  opportunity?: Opportunity,
}){
  const { query } = useRouter()
  const [ fetchKey, setFetchKey ] = useState(v1())
  const [ job, setJob ] = useState(opportunity)
  const [ jobNotGenerated, setJobNotGenerated ] = useState(!opportunity)

  const numberFormat = (number: number) => Intl.NumberFormat('en').format(number)

  const { data, error } = useSWR( jobNotGenerated ? fetchKey : null, () => api.createOpportunity(query?.id as string), {
    onSuccess(data, key){
      setJob(data)
      setJobNotGenerated(!jobNotGenerated)
    }
  })

  const deadline = new Date(job?.deadline?.toString())
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  if (jobNotGenerated && !data && !error) return <Generating></Generating>


  if (error) return <Error error={error}></Error>

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
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
                          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{job.title}</span>
                      </div>
                    </li>
                  </ol>
                </div>
              </nav>
            </div>
          </div>
        </Menu>


        <main className="py-10">
          {/* Page header */}
          <div
            className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 flex-col">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
              <div className="px-4 py-5 sm:px-6 flex-1 min-w-0">
                <div>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {job.title}
                  </h2>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">


                    {job?.type && <div className="mt-2 flex items-center text-sm text-gray-500">
                      {/* Heroicon name: briefcase */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      {job.type}
                    </div>}
                    
                    {(job?.location || job?.isRemote) && <div className="mt-2 flex items-center text-sm text-gray-500">
                      {/* Heroicon name: location-marker */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}, {job.isRemote ? 'Remote' : ''}
                    </div>}

                    {job?.compensationCurrency && <div className="mt-2 flex items-center text-sm text-gray-500">
                      {/* Heroicon name: currency-dollar */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      {job.compensationCurrency}{numberFormat(job.minSalaryRange)} { job?.maxSalaryRange && <> - {job.compensationCurrency}{numberFormat(job.maxSalaryRange)}</>} / {job.compensationPeriod}
                    </div>}


                    {job?.deadline && <div className="mt-2 flex items-center text-sm text-gray-500">
                      {/* Heroicon name: calendar */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Closing on {months[deadline.getMonth()]} {deadline.getDate()}, {deadline.getFullYear()}.
                    </div>}
                  </div>
                </div>
              </div>
              {job?.company && <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="w-full mb-2 flex justify-between">
                  <p className="text-sm font-semibold capitalize text-gray-500">About {job?.company?.name}</p>
                  {job?.members && <div className="flex-shrink-0 sm:mt-0">
                    <div className="flex overflow-hidden">
                      {(JSON.parse(job.members) as []).map(member => member?.person?.picture ? <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={member?.person?.pictureThumbnail} alt="" /> : <></>)}
                    </div>
                  </div>}
                </div>
                {(job.company?.profile?.summary ?? job.company?.profile?.culture).split('\n').map(info => <p className="text-sm py-1 leading-snug">{info}</p>)}
              </div>}
            </div>
          </div>

          <div
            className="max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-7xl sm:px-6 lg:px-8 mt-6">
            <div className="space-y-6 w-full">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
                    {job.responsibilities && <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Responsibilities
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {job.responsibilities.split('\n').map(content => <p className="py-1 leading-snug">{content}</p>)}
                      </dd>
                    </div>}
                    
                    {job?.additionalInformation && (JSON.parse(job.additionalInformation) as {code: string, content: string}[]).map(info => <div className="sm:col-span-1" key={v1()}>
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {info?.code}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {info?.content.split('\n').map(content => <div className="py-1 leading-snug" key={v1()} dangerouslySetInnerHTML={{__html: content}}></div>)}
                      </dd>
                    </div>)}
                  </dl>
                </div>
              </section>
            </div>

            {/* Skills */}
            <section aria-labelledby="skills-title">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
                {job.skills.length > 0 && <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Skills
                  </dt>

                  <dd className="mt-1 text-sm text-gray-900 flex flex-wrap flex-row">
                    {
                      job.skills.map(skill => 
                      <span className="inline-flex w-max items-center px-4 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 my-2 mx-2" key={v1()}>
                        {skill?.name}
                      </span>
                      )
                    }
                  </dd>
                </div>}
                </dl>
              </div>
            </section>

            {/* Poster */}
            <section aria-labelledby="poster-title">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
                {job?.poster && <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Posted By
                  </dt>

                  <dd className="mt-1 text-sm text-gray-900 flex flex-wrap flex-row">
                    <div className="flex items-center space-x-5 my-5">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img className="h-16 w-16 rounded-full"
                            src={job?.poster?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(job?.poster?.username)}?d=identicon`}
                            alt="" />
                          <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <Link href={`/professional/${job?.poster?.username}`}>
                          <a className="text-2xl font-bold text-gray-900 transition-colors ease-in-out duration-150 hover:text-teal-500">{job?.poster?.name}</a>
                        </Link>
                        <p className="text-sm font-medium text-gray-500">{job?.poster?.headline}</p>
                      </div>
                    </div>
                  </dd>
                </div>}
                </dl>
              </div>
            </section>

            
          </div>
        </main>
      </div>
  
    </Layout>
    
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const opportunity = await api.getOpportunity(params?.id as string)
    return { 
      props: {
        opportunity
      }
    }
  } catch(error){
    let err: ApiError = error;
    if (err?.data?.type === 'not_generated') {
      return {
        props: {}
      }
    }
    return { 
      props: {},
      notFound: true
    }
  }
}

function Generating(){
  return (
    <div className="min-h-screen absolute w-full top-0 left-0 flex flex-col items-center justify-center bg-gray-200">
      <Spinner></Spinner>
      <h3 className="font-semibold text-2xl mt-4">
        Generating
      </h3>
    </div>
  )
}

function Error( { error }){
  return (
    <div className="min-h-screen absolute w-full top-0 left-0 flex items-center justify-center bg-gray-200">
      <h3 className="font-normal text-2xl">
        {error?.message}
      </h3>
    </div>
  )
}