import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useDataFetching from "@/hooks/useDataFetching";
import { useRouter } from 'next/router';
import { Pagination } from '@/components';

const Details = () => {
  const router = useRouter()

  const [data, setData] = useState<any>({})

  const [dataComment, setDataComment] = useState<any>([])
  const [pagination, setPagination] = useState<any>({})

  const { isLoading, refetch } = useDataFetching(`/posts/${router.query.id}`, {
    onSuccess: (data) => {
      setData(data?.data)
    },
    onError: (err) => toast.error(err?.response?.data?.message || 'Server error, Please try again later!')
  })

  const { isLoading: isLoadingCommnet, refetch: refetchComment } = useDataFetching(`/posts/${router.query.id}/comments`, {
    onSuccess: (data) => {
      console.log(data)
      setDataComment(data?.data)
      setPagination(data?.meta?.pagination)
    },
    onError: (err) => toast.error(err?.response?.data?.message || 'Server error, Please try again later!')
  })

  return (
    <div className='flex flex-col items-center w-full'>
      <div className="py-3 border-b-[1px] border-gray-200 w-3/4 sm:w-2/3">
        <div className="font-bold text-[24px]">{data?.title}</div>
        <div className="text-[14px] font-light pt-3">
          ID: {data?.id}
        </div>
        <div className="text-[14px] font-light pb-3">
          Created by: {data?.user_id}
        </div>
        <div className="text-gray-500">{data?.body}</div>
      </div>

      <div className="mt-5 font-semibold text-[18px] mb-5">Comments</div>

      {isLoadingCommnet && <div>Loading...</div>}

      {!isLoadingCommnet && dataComment?.map((item: any, index: any) => (
        <div key={index} className="py-3 border-b-[1px] border-gray-200 w-3/4 sm:w-2/3">
          <div className=" pt-3">
            {item?.name}
          </div>
          <div className="text-[14px] font-light pb-3 text-gray-500">
            {item?.email}
          </div>

          <div className="text-[14px]">{item?.body}</div>
        </div>
      ))}

      {!isLoadingCommnet && dataComment?.length === 0 && <div>No Comment Found</div>}

      {dataComment?.length > 0 &&
        <Pagination currentPage={pagination?.page}
          onPageChange={(page) => refetchComment({ page }, false)}
          totalPages={pagination?.total} />
      }
    </div>
  )
}

export default Details