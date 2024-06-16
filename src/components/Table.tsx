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
                                        <div className='cursor-pointer'>X</div>
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