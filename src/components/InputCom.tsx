import React from 'react'

const InputCom = ({ ...rest }) => {
    return (
        <input {...rest} type="text" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
    )
}

export default InputCom