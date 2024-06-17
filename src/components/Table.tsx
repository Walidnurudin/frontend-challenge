import React from 'react'

import { Menu, MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

type TableProps = {
    data: any[],
    onClickDetail: (data: Object) => void,
    onClickDelete: (id: number) => void,
    onClickUpdate: (data: Object) => void,
    isLoading: boolean
}

const Table = ({ data, onClickDetail, onClickDelete, onClickUpdate, isLoading }: TableProps) => {
    return (
        <div className="align-middle w-3/4 sm:w-2/3 px-8 pt-3 mx-auto flex justify-center">
            <table className="">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Email</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Gender</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white w-full">
                    {isLoading && (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">Loading...</td>
                        </tr>

                    )}

                    {!isLoading && data?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm leading-5 text-gray-800">{item?.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                <div className="text-sm leading-5">{item?.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">{item?.email}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">{item?.gender}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                                {item?.status === 'active' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                <Menu
                                    menuButton={
                                        <div className='cursor-pointer'>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" fill="#1C274C" />
                                                <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#1C274C" />
                                                <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="#1C274C" />
                                            </svg>
                                        </div>
                                    }
                                    transition
                                >
                                    <MenuItem onClick={() => onClickDetail(item)}>Detail</MenuItem>
                                    <MenuItem onClick={() => onClickUpdate(item)}>Update</MenuItem>
                                    <MenuItem onClick={() => onClickDelete(item)}>Delete</MenuItem>
                                </Menu>
                            </td>
                        </tr>
                    ))}

                    {!isLoading && data?.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">Data not found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table