import React from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()

    return (
        <nav className="bg-green-200 flex justify-between w-full">
            <div>
                <div className="py-2 px-4 text-black hover:text-gray-500 cursor-pointer" onClick={() => router.push('/')}>Home</div>
            </div>
            <div className="flex h-12">
                <div className="py-2 px-4 text-black hover:text-gray-500 cursor-pointer" onClick={() => router.push('/')}>Blogs</div>
                <div className="py-2 px-4 text-black hover:text-gray-500 cursor-pointer" onClick={() => router.push('/user-management')}>User Management</div>
            </div>
        </nav>
    )
}

export default Navbar