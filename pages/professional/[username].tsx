import { GetServerSideProps } from "next";
import api from "../../api";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import { ApiError } from "../../interfaces/error.interface";
import { Person } from "../../interfaces/person.interface";
import { FaWeightHanging, FaTwitter, FaFacebookF, FaLinkedin, FaGithub, FaGitlab, FaInstagram, FaMedium, FaLink } from 'react-icons/fa'
import Link from 'next/link'
import useSWR from "swr";
import { useEffect, useState } from "react";
import { v1 } from "uuid";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

export default function UserDetail({ user, isNotGenerated = false }: {
  user?: Person,
  isNotGenerated?: boolean
}){
  const { query } = useRouter()
  const [ fetchKey, setFetchKey ] = useState(v1())
  const [ person, setPerson ] = useState(user)
  const [ userNotGenerated, setUserNotGenerated ] = useState(isNotGenerated)

  
  const { ...obj } = useSWR( userNotGenerated ? fetchKey : null, () => api.createPerson(query?.username as string))
  const { data, error } = obj

  if (data) {
    console.log(data)
    setPerson(data)
    setUserNotGenerated(!userNotGenerated)
  }

  if (userNotGenerated && !data && !error) return (<div className="min-h-screen absolute w-full top-0 left-0 flex flex-col items-center justify-center bg-gray-200">
    <Spinner></Spinner>
    <h3 className="font-semibold text-2xl mt-4">
      Generating
    </h3>
  </div>)


  if (error) return (<div className="min-h-screen absolute w-full top-0 left-0 flex items-center justify-center bg-gray-200">
      <h3 className="font-normal text-2xl">
        {error?.message}
      </h3>
    </div>)


  return (
    <Layout>
      <div className="bg-gray-100">
        <Menu className="bg-white pb-2">
        <div className="mx-auto px-4 sm:px-6">
            <div className="border-t border-gray-200 py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <div className="flex sm:hidden">
                  <Link href="/professionals">
                  <a
                    className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {/* Heroicon name: arrow-narrow-left */}
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd" />
                    </svg>
                    <span>Back to Professionals</span>
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
                        <Link href="/professionals">
                          <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Professionals</a>
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
                          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{person.name}</span>
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
            className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img className="h-16 w-16 rounded-full"
                    src={person?.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(person.username)}?d=identicon`}
                    alt="" />
                  <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
                <p className="text-sm font-medium text-gray-500">{person.headline}</p>
                <p className="text-sm font-medium text-gray-500 inline-flex items-center"><FaWeightHanging className="text-sm mr-2"></FaWeightHanging> &bull; { parseInt(person.profileWeight as unknown as string)} </p>
              </div>
            </div>
          </div>
          <div
            className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                      {person?.name?.split(' ')[0]}'s Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details about this professional expert.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                      {person.phone && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.phone}
                        </dd>
                      </div>)}

                      {person.username && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          personname
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.username}
                        </dd>
                      </div>)}

                      {person.isOpenToJobs && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Job Salary Expectation
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.preferredJobCompensationCurrency} {person.preferredJobCompensationAmount} / {person.preferredJobCompensationCycle}
                        </dd>
                      </div>)}

                      {person.isOpenToGigs && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Gig Salary Expectation
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.preferredGigCompensationCurrency} {person.preferredGigCompensationAmount} / {person.preferredGigCompensationCycle}
                        </dd>
                      </div>)}

                      {person.timezone && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Timezone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.timezone}
                        </dd>
                      </div>)}

                      {person.location && (<div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.location}
                        </dd>
                      </div>)}

                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Social
                        </dt>

                        <dd className="mt-1 text-sm text-gray-900 flex flex-wrap flex-row">
                          {
                            JSON.parse(person?.links || "[]").length > 0 && (JSON.parse(person?.links) as {
                              id: string,
                              name: string,
                              address: string
                            }[]).map(link => {
                              switch (link.name) {
                                case 'twitter':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaTwitter></FaTwitter>
                                    </a>
                                  )
                                case 'linkedin':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaLinkedin></FaLinkedin>
                                    </a>
                                  )
                                case 'facebook':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaFacebookF></FaFacebookF>
                                    </a>
                                  )
                                case 'github':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaGithub></FaGithub>
                                    </a>
                                  )
                                case 'gitlab':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaGitlab></FaGitlab>
                                    </a>
                                  )
                                case 'instagram':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaInstagram></FaInstagram>
                                    </a>
                                  )
                                case 'medium':
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaMedium></FaMedium>
                                    </a>
                                  )
                                default:
                                  return (
                                    <a className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium my-2 mx-2" href={link.address} target="blank" key={v1()}>
                                      <FaLink></FaLink>
                                    </a>
                                  )
                              }
                            }
                            )
                          }
                        </dd>
                      </div>

                      {person?.bio && <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Summary
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {person.bio}
                        </dd>
                      </div>}

                      {person?.skills?.length > 0 && <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Skills
                        </dt>

                        <dd className="mt-1 text-sm text-gray-900 flex flex-wrap flex-row">
                          {
                            person.skills.map(skill => 
                            <span className="inline-flex w-max items-center px-4 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 my-2 mx-2" key={v1()}>
                              {skill.skill.name} &bull;  {parseInt(skill.skillWeight as unknown as string)} <FaWeightHanging className="text-xs ml-2"/>
                            </span>
                            )
                          }
                        </dd>
                      </div>}

                      {person?.interests?.length > 0 && <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Interests
                        </dt>

                        <dd className="mt-1 text-sm text-gray-900 flex flex-wrap flex-row">
                          {
                            person.interests.map(interest => 
                            <span className="inline w-max items-center px-3 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 my-2 mx-2" key={v1()}>
                              {interest.skill.name}
                            </span>
                            )
                          }
                        </dd>
                      </div>}


                    </dl>
                  </div>
                  <div>
                    <a href="#"
                      className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">Print Profile</a>
                  </div>
                </div>
              </section>
            </div>
            <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">Experience</h2>
                {person?.experiences?.length > 0 && <div className="mt-6 flow-root">
                  <ul>
                    {person.experiences.map(experience => <li key={v1()}>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-500 ring-1 ring-offset-teal-300">
                              {/* Heroicon name: person */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                                <circle cy={20} cx={20} r={20} fill={`url(#prefix__pattern__${experience.code})`}/>
                                <defs>
                                  <pattern id={`prefix__pattern__${experience.code}`} patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref={`#prefix__image__${experience.code}`}></use>
                                  </pattern>
                                  <image id={`prefix__image__${experience.code}`} href={experience.company?.logo} height="40" width="40" preserveAspectRatio="xMinYMin meet" className="object-contain"/>
                                </defs>
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500 font-medium capitalize">{experience.role}</p>
                              <p className="leading-loose text-xs font-medium">{experience.company.name} &bull; {experience.location ?? 'Remote'}</p>
                              <ul className="list-disc text-sm grid grid-cols-1 gap-y-2">
                                {(JSON.parse(experience?.responsibilities ?? '[]')as []).map(responsibility => <li key={v1()}>{responsibility}</li>)}
                              </ul>
                              
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={experience.fromDate as string}>{new Date(experience.fromDate).getFullYear()}</time>
                              
                              {experience.toDate && (<>
                                <span>&bull;</span>
                                <time dateTime={experience.toDate as string}>{new Date(experience.toDate).getFullYear()}</time>
                              </>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>)}
                  </ul>
                </div>}
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
    console.log(params)
    const user = await api.getPerson(params?.username as string)
    return { 
      props: {
        user
      }
    }
  } catch(error){
    console.log(error)
    let err: ApiError = error;
    if (err?.data?.type === 'not_generated') {
      return {
        props: {
          isNotGenerated: true
        }
      }
    }
    return { 
      props: {},
      notFound: true
    }
  }
}