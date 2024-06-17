import React from 'react'

const MessageError = ({ message }: { message: any }) => {
    return (
        <div className='text-red-600 mt-[5px] text-[12px]'>{message}</div>
    )
}

export default MessageError