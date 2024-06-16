import React, { useEffect, useState } from 'react'
import usePostData from '@/hooks/usePostData'
import InputCom from './InputCom'
import useDeleteData from '@/hooks/useDeleteData'
import toast from 'react-hot-toast'

type ModalFormUserProps = {
    type: "CREATE" | "EDIT" | "DETAIL" | "DELETE",
    dataDetail?: any,
    close: () => void,
    refetch: () => void
}

const ModalFormUser = ({ type, dataDetail, close, refetch }: ModalFormUserProps) => {
    const [data, setData] = useState({
        name: '',
        gender: '',
        email: '',
        status: ''
    })

    useEffect(() => {
        if (type === 'DETAIL') setData(dataDetail)
    }, [dataDetail, type])

    const { postData, isLoading } = usePostData('/users', {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => toast.error(error?.response?.data?.message || 'Server error, Please try again later!')
    })

    const { deleteData, isLoading: isLoadingDelete } = useDeleteData('/users', {
        onSuccess: (data) => {
            close()
            refetch()
            toast.success('Data has been deleted')
        },
        onError: (error) => toast.error(error?.response?.data?.message || 'Server error, Please try again later!')
    })

    const submit = () => {
        postData({
            ...data
        })
    }

    return (
        <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
            <div className="mx-auto w-3/4 sm:w-2/3  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                {type === 'DELETE' ? (
                    <>
                        <div className='text-red-600 font-semibold text-lg pb-5'>Are you sure you want to delete this data?</div>

                        <div className='flex gap-4'>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" onClick={() => deleteData(dataDetail?.id)}>Yes</button>
                            <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" onClick={close}>No</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex justify-between w-full'>
                            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-8">{type}</h1>
                            <div className='cursor-pointer text-xl text-red-600 font-bold' onClick={close}>X</div>
                        </div>

                        <form className="w-full flex flex-col gap-4">
                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name</label>
                                <InputCom disabled={type === 'DETAIL'} value={data.name} onChange={(e: any) => setData({ ...data, name: e.target.value })} />
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Gender</label>
                                <select value={data?.gender} onChange={
                                    (e: any) => setData({
                                        ...data,
                                        gender: e.target.value
                                    })
                                }
                                    disabled={type === 'DETAIL'}
                                    className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email</label>
                                <InputCom disabled={type === 'DETAIL'} value={data.email} type='email' onChange={(e: any) => setData({ ...data, email: e.target.value })} />
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Status</label>
                                <select value={data?.status} onChange={
                                    (e: any) => setData({
                                        ...data,
                                        status: e.target.value
                                    })
                                }
                                    disabled={type === 'DETAIL'}
                                    className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value='active'>Active</option>
                                    <option value='inactive'>Inactive</option>
                                </select>
                            </div>

                            {type !== 'DETAIL' && (
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" onClick={submit}>Submit</button>
                            )}
                        </form>
                    </>

                )}


            </div>
        </div>
    )
}

export default ModalFormUser