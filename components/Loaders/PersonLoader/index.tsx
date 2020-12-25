import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

export default function PersonLoader(){
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