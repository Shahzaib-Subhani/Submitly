import { ChevronDown, SearchIcon } from 'lucide-react';
import React from 'react';

const TableFilter = ({ filterData }) => {
    return (
        <>
            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-200  rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 "> Show </span>
                    <div className="relative z-20 bg-transparent">
                        <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none  h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-indigo-300 focus:outline-hidden focus:ring-3 focus:ring-indigo-500/10 " onChange={(e) => filterData.handleSetPageSize(e.target.value)}>
                            <option value="10" className="text-gray-500 ">10</option>
                            <option value="25" className="text-gray-500 ">25</option>
                            <option value="50" className="text-gray-500 ">50</option>
                        </select>
                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 ">
                            <ChevronDown size={16} />
                        </span>
                    </div>
                    <span className="text-gray-500 "> entries </span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                        <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 ">
                            <SearchIcon size={20} />
                        </button>
                        <input x-model="search" onChange={(e) => filterData.handleSearch(e.target.value)} placeholder="Search..." className=" h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 transition duration-300 ease  focus:border-indigo-400 hover:border-indigo-300  p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 xl:w-[300px]" type="text" />
                    </div>

                </div>
            </div>
        </>
    );
}

export default TableFilter;
