import React, { useEffect, useState } from 'react'
import usePostData from '@/hooks/usePostData'
import InputCom from './InputCom'
import useDeleteData from '@/hooks/useDeleteData'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import useUpdateData from '@/hooks/useUpdateData'
import MessageError from './MessageError'

type ModalFormUserProps = {
    type: "CREATE" | "EDIT" | "DETAIL" | "DELETE",
    dataDetail?: any,
    close: () => void,
    refetch: () => void
}

const ModalFormUser = ({ type, dataDetail, close, refetch }: ModalFormUserProps) => {
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        watch,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            gender: 'male',
            status: 'active'
        }
    })

    useEffect(() => {
        if (type === 'DETAIL' || type === "EDIT") {
            setValue('name', dataDetail?.name)
            setValue('email', dataDetail?.email)
            setValue('gender', dataDetail?.gender)
            setValue('status', dataDetail?.status)
        }
    }, [dataDetail, setValue, type])

    const { postData, isLoading } = usePostData('/users', {
        onSuccess: () => {
            close()
            refetch()
            toast.success('Data has been created')
        },
        onError: (error) => toast.error(error?.response?.data?.data?.[0]?.message || 'Server error, Please try again later!')
    })


    const { updateData, isLoading: isLoadingUpdate } = useUpdateData(`/users/${dataDetail?.id}`, {
        onSuccess: () => {
            close()
            refetch()
            toast.success('Data has been updated')
        },
        onError: (error) => toast.error(error?.response?.data?.data?.[0]?.message || 'Server error, Please try again later!')
    })

    const { deleteData, isLoading: isLoadingDelete } = useDeleteData('/users', {
        onSuccess: () => {
            close()
            refetch()
            toast.success('Data has been deleted')
        },
        onError: (error) => toast.error(error?.response?.data?.message || 'Server error, Please try again later!')
    })

    const submit = (data: any) => {
        if (type === 'EDIT') updateData({ ...data })
        else postData({
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
                                <Controller
                                    control={control}
                                    name='name'
                                    rules={{
                                        required: 'Name is required'
                                    }}
                                    render={({ field }) => (
                                        <InputCom {...field} disabled={type === 'DETAIL'} value={watch()?.name} onChange={(e: any) => setValue('name', e.target.value)} />
                                    )}
                                />

                                {errors.name && <MessageError message={errors?.name?.message} />}
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Gender</label>
                                <Controller
                                    control={control}
                                    name='gender'
                                    rules={{
                                        required: 'Gender is required'
                                    }}
                                    render={({ field }) => (
                                        <select {...field} value={watch()?.gender} onChange={(e: any) => setValue('gender', e.target.value)}
                                            disabled={type === 'DETAIL'}
                                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                    )}
                                />


                                {errors.gender && <MessageError message={errors?.gender?.message} />}
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email</label>
                                <Controller
                                    control={control}
                                    name='email'
                                    rules={{
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Email is not valid'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <InputCom {...field} disabled={type === 'DETAIL'} value={watch()?.email} type='email' onChange={(e: any) => setValue('email', e.target.value)} />
                                    )}
                                />


                                {errors.email && <MessageError message={errors?.email?.message} />}
                            </div>

                            <div className="flex items-start flex-col justify-start">
                                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2">Status</label>
                                <Controller
                                    control={control}
                                    name='status'
                                    rules={{
                                        required: 'Status is required'
                                    }}
                                    render={({ field }) => (
                                        <select {...field} value={watch()?.status} onChange={(e: any) => setValue('status', e.target.value)}
                                            disabled={type === 'DETAIL'}
                                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value='active'>Active</option>
                                            <option value='inactive'>Inactive</option>
                                        </select>
                                    )}
                                />


                                {errors.status && <MessageError message={errors?.status?.message} />}
                            </div>

                            {type !== 'DETAIL' && (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" onClick={isLoading || isLoadingUpdate ? () => { } : handleSubmit(submit)}>
                                    {isLoading || isLoadingUpdate ? 'Loading...' : 'Submit'}
                                </button>
                            )}
                        </form>
                    </>

                )}


            </div>
        </div>
    )
}

export default ModalFormUser