// src/Pagination.js
import React from 'react';

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pageNumbers = [];
    const idx = currentPage === 1 ? currentPage : currentPage === 2 ? currentPage - 1 : currentPage - 2;

    for (let i = idx; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="items-center w-full flex justify-center -space-x-px py-10">
            <li>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
            </li>
            {pageNumbers?.splice(0, 5)?.map(number => (
                <li key={number}>
                    <button
                        onClick={() => onPageChange(number)}
                        className={`px-3 py-2 leading-tight border ${currentPage === number ? 'text-black bg-green-200' : 'text-gray-500 bg-white'} hover:bg-gray-100 hover:text-gray-700`}
                    >
                        {number}
                    </button>
                </li>
            ))}
            <li>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
