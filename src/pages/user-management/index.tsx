import React, { useState } from 'react'
import toast from 'react-hot-toast'

import useDataFetching from '@/hooks/useDataFetching'
import { ModalFormUser, Pagination, Search, Table } from '@/components'
import { useModal } from '@/hooks/useModal'

const Index = () => {
    const { isOpen, openModal, closeModal } = useModal(false)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState<any>({})

    const [search, setSearch] = useState('')

    const { isLoading, refetch } = useDataFetching(`/users`, {
        onSuccess: (data) => {
            setData(data?.data)
            setPagination(data?.meta?.pagination)
        },
        onError: (err) => toast.error(err?.response?.data?.message || 'Server error, Please try again later!')
    })

    const handleOpenModal = (data: Object) => {
        console.log(data)
    }

    const changeSearch = (value: string) => setSearch(value)

    const handleSearch = () => refetch({ name: search, page: 1 }, false)

    return (
        <div>
            {isOpen && <ModalFormUser type='CREATE' />}

            <Search value={search} onChange={changeSearch} onClick={handleSearch} />
            <Table data={data} onClickDetail={(data) => handleOpenModal(data)} isLoading={isLoading} />

            {data?.length > 0 &&
                <Pagination currentPage={pagination?.page}
                    onPageChange={(page) => refetch({ page, name: search }, false)}
                    totalPages={pagination?.total} />
            }
        </div>
    )
}

export default Index