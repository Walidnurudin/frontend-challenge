import React, { useState } from 'react'
import usePostData from '@/hooks/usePostData'
import InputCom from './InputCom'

const ModalFormUser = ({ type }: { type: "CREATE" | "EDIT" | "DETAIL" | "DELETE" }) => {
    const [data, setData] = useState({
        name: '',
        gender: '',
        email: '',
        status: ''
    })

    const { postData, isLoading } = usePostData('/users', {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const submit = () => {
        postData({
            ...data
        })
    }

    return (
        <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
            style={{ background: 'rgba(0,0,0,.7)' }}>
            <div className="mx-auto w-3/4 sm:w-2/3  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
                <form className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name</label>
                        <InputCom value={data.name} onChange={(e: any) => setData({ ...data, name: e.target.value })} />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Gender</label>
                        <select value={data?.gender} onChange={
                            (e: any) => setData({
                                ...data,
                                gender: e.target.value
                            })
                        }>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email</label>
                        <InputCom value={data.email} type='email' onChange={(e: any) => setData({ ...data, email: e.target.value })} />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Status</label>
                        <select value={data?.status} onChange={
                            (e: any) => setData({
                                ...data,
                                status: e.target.value
                            })
                        }>
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                        </select>
                    </div>

                    {type !== 'DETAIL' && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" onClick={submit}>Submit</button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ModalFormUser