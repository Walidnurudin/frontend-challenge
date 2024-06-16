import { Pagination } from "@/components";
import useDataFetching from "@/hooks/useDataFetching";
import { useRouter } from "next/router";
import { Key, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter()

  const [data, setData] = useState<any>([])
  const [pagination, setPagination] = useState<any>({})

  const { isLoading, refetch } = useDataFetching(`/posts`, {
    onSuccess: (data) => {
      console.log(data)
      setData(data?.data)
      setPagination(data?.meta?.pagination)
    },
    onError: (err) => toast.error(err?.response?.data?.message || 'Server error, Please try again later!')
  })

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-5 font-semibold text-[18px] mb-5">Blogs Frontend Challenge</div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && data?.map((item: any, index: Key) => (
        <div key={index} className="py-3 border-b-[1px] border-gray-200 w-3/4 sm:w-2/3 cursor-pointer" onClick={() => router.push(`/d/${item.id}`)}>
          <div className="font-bold text-[24px]">{item?.title}</div>
          <div className="line-clamp-2 text-gray-500">{item?.body}</div>

          <div className="text-[14px] font-light pt-3">
            Created by: {item?.user_id}
          </div>
        </div>
      ))}

      {!isLoading && data?.length === 0 && <div>Data not found</div>}

      {data?.length > 0 && (
        <Pagination currentPage={pagination?.page}
          onPageChange={(page) => refetch({ page }, false)}
          totalPages={pagination?.total} />
      )}
    </div>
  );
}
