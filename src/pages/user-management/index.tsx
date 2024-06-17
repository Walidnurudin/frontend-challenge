import React, { useState } from 'react'
import toast from 'react-hot-toast'

import useDataFetching from '@/hooks/useDataFetching'
import { ModalFormUser, Pagination, Search, Table } from '@/components'
import { useModal } from '@/hooks/useModal'

type TypeModal = "CREATE" | "EDIT" | "DETAIL" | "DELETE"

const Index = () => {
    const { isOpen, openModal, closeModal } = useModal(false)
    const [typeModal, setTypeModal] = useState<TypeModal>('CREATE')

    const [data, setData] = useState([])
    const [pagination, setPagination] = useState<any>({})

    const [search, setSearch] = useState('')

    const [dataDetail, setDataDetail] = useState({})

    const { isLoading, refetch } = useDataFetching(`/users`, {
        onSuccess: (data) => {
            setData(data?.data)
            setPagination(data?.meta?.pagination)
        },
        onError: (err) => toast.error(err?.response?.data?.message || 'Server error, Please try again later!')
    })

    const handleOpenModal = (data: Object, type: TypeModal) => {
        openModal()
        setTypeModal(type)
        setDataDetail(data)
    }

    const changeSearch = (value: string) => setSearch(value)

    const handleSearch = () => refetch({ name: search, page: 1 }, false)

    return (
        <div>
            {isOpen && <ModalFormUser refetch={() => refetch({ name: search, page: pagination?.page }, false)} close={closeModal} dataDetail={dataDetail} type={typeModal} />}

            <div className='flex justify-end w-3/4 sm:w-2/3 mx-auto'>
            </div>

            <Search value={search} onChange={changeSearch} onClick={handleSearch} onCreate={() => handleOpenModal({}, "CREATE")} />

            <Table
                data={data}
                onClickDetail={(data) => handleOpenModal(data, "DETAIL")}
                onClickDelete={(data) => handleOpenModal(data, "DELETE")}
                onClickUpdate={(data) => handleOpenModal(data, "EDIT")}
                isLoading={isLoading}
            />

            {
                data?.length > 0 &&
                <Pagination currentPage={pagination?.page}
                    onPageChange={(page) => refetch({ page, name: search }, false)}
                    totalPages={pagination?.total} />
            }
        </div >
    )
}

export default Index