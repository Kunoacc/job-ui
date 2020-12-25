import { PersonResult } from "../../interfaces/search.interface";
import Link from "next/link";
import { v1 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

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

export default function PersonCard({ person, checkBoxState, toggleCheckBoxState }: 
  {
    person: PersonResult,
    checkBoxState: string[],
    toggleCheckBoxState: Dispatch<any>
  }) {

  const variant = useBreakpointValue({ base: true, md: false})
  const [ isCheckBoxVisible, setIsCheckBoxVisible ] = useState(variant)

  useEffect(() => {
    setIsCheckBoxVisible(variant)
  }, [variant])

  return (
    <motion.li
    variants={variants}
    whileHover={{ scale: 1.025 }}
    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 relative" key={v1()} onHoverStart={e => setIsCheckBoxVisible(true)} onHoverEnd={e => setIsCheckBoxVisible(false)}>
      <div className="flex-1 flex flex-col p-8">
          <AnimatePresence>
            {
              (isCheckBoxVisible || checkBoxState.includes(person?.username)) && <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .15, type: 'spring'}}
                whileHover={{scale: 1.1 }}
                key={v1()}
                className="flex items-center h-5 absolute top-5 right-5">
                <input id="comments" name="comments" type="checkbox" className={`focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded ${checkBoxState.length >= 2 && !checkBoxState.includes(person?.username)? 'opacity-50 cursor-not-allowed' : '' }`} 
                  value={person?.username} 
                  checked={checkBoxState.includes(person?.username)}
                  onChange={toggleCheckBoxState}
                  // disabled={checkBoxState.length >= 2 && !checkBoxState.includes(person?.username)} 
                  />
              </motion.div>
            }
          </AnimatePresence>
      
        <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
          src={person.picture ?? `https://www.gravatar.com/avatar/${encodeURIComponent(person.username)}?d=identicon`}
          alt="" />
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-sm">{person.professionalHeadline}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            {person.verified && <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Verified</span>}
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
    </motion.li>
  )
}