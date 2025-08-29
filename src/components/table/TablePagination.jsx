import { ChevronLeft, ChevronRightIcon } from 'lucide-react';
import React from 'react';

const TablePagination = ({ paginationData }) => {
    console.log(paginationData);

    return (
        <>
            <div className="border border-t-0 rounded-b-xl border-gray-200 py-4 pl-[18px] pr-4 ">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                    <div className="pb-3 xl:pb-0">
                        <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200  xl:border-b-0 xl:pb-0 xl:text-left">Showing {paginationData.fromRecord} to {paginationData.toRecord} of {paginationData.totalRecords} entries</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button disabled={!paginationData.canPrev} className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700  hover:bg-indigo-100 text-sm disabled:bg-gray-50" onClick={() => paginationData.handlePrev()}><ChevronLeft size={18} /></button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: paginationData.totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginationData.handlePageIndex(i)}
                                    className={`px-4 py-2 flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium ${paginationData.index === i
                                        ? "bg-indigo-500 text-white"
                                        : "text-gray-700 hover:bg-blue-500/[0.08] hover:text-indigo-500"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button className="ml-2.5 flex items-center justify-center rounded-lg border disabled:bg-gray-50 border-gray-300 hover:bg-indigo-100 bg-white px-3.5 py-2.5 text-gray-700 text-sm  h-10 " onClick={() => paginationData.handleNext()} disabled={!paginationData.canNext}>
                            <ChevronRightIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TablePagination;
