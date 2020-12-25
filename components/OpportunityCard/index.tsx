import { OpportunityResult } from "../../interfaces/search.interface";
import Link from "next/link";
import { v1 } from "uuid";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export default function OpportunityCard({ opportunity }: { opportunity: OpportunityResult}) {
  const deadline = new Date(opportunity?.deadline?.toString())
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const numberFormat = (number: number) => Intl.NumberFormat('en').format(number)

  return (
    <motion.li 
    variants={variants}
    whileHover={{ scale: 1.015 }}
    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" key={v1()}>
      <Link href={`/opportunity/${opportunity.id}`}>
        <a className="block hover:bg-gray-50 transition-colors ease-linear duration-150 rounded-lg">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {opportunity.objective}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                 {opportunity.type}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                {opportunity?.compensation?.data && <p className="flex items-center text-sm text-gray-500">
                  {/* Heroicon name: users */}
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {opportunity.compensation.data.currency}{numberFormat(opportunity.compensation.data.minAmount)} {opportunity.compensation.data.maxAmount && <> - {opportunity.compensation.data.currency}{numberFormat(opportunity.compensation.data.maxAmount)}</>} {opportunity.compensation.data.periodicity}
                </p>}


                {opportunity?.locations?.length > 0 && <p className={`mt-2 flex items-center text-sm text-gray-500 ${opportunity?.compensation?.data ? `sm:mt-0 sm:ml-6` : null}`}>
                  {/* Heroicon name: location-marker */}
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {opportunity?.locations?.map((x, index) => <p key={v1()}>{` ${x}${index === opportunity.locations.length - 1 ? ` ` : `, ` } `}</p>)}
                  {opportunity.remote ? ', Remote' : ''}
                </p>}
              </div>
              {opportunity?.deadline && <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                {/* Heroicon name: calendar */}
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <p>
                  Closing on
                   <time dateTime={opportunity.deadline.toString()}> {months[deadline.getMonth()]} {deadline.getDate()}, {deadline.getFullYear()}</time>
                </p>
              </div>}
            </div>
          </div>
        </a>
      </Link>
    </motion.li>
  )
}