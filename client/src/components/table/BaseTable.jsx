
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import TableFilter from "./TableFilter";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableBody from "./TableBody";
import { useEffect, useState } from "react";




const BaseTable = ({
    tableHeaders,
    tableData,
    pagination,
    setPagination,
    search,
    setSearch,
    setSearchType,
    paginationInfo,
    searchColumns }) => {

    const [globalFilter, setGlobalFilter] = useState("");


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setSearch(globalFilter);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [globalFilter]);

    const table = useReactTable({
        data: tableData,
        columns: tableHeaders,
        getCoreRowModel: getCoreRowModel(),
    });

    const tableFilterData = {
        handleSearch: (input) => {
            setGlobalFilter(input);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        },
        handleSetPageSize: (size) => {
            setPagination((prev) => ({
                ...prev,
                pageSize: size,
                pageIndex: 0,
            }));
        },
        handleSearchType: (input) => {
            setSearchType(input);
        }
    };

    const { pageIndex } = pagination;

    const tablePaginationData = {
        index: pageIndex,
        totalRecords: paginationInfo.totalRecords,
        fromRecord: paginationInfo.fromRecord,
        toRecord: paginationInfo.toRecord,
        canPrev: pageIndex > 0,
        canNext: pageIndex + 1 < paginationInfo.totalPages,
        totalPages: paginationInfo.totalPages ?? 1,
        handlePrev: () => setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 })),
        handleNext: () => setPagination((p) => ({ ...p, pageIndex: p.pageIndex + 1 })),
        handlePageIndex: (i) => setPagination((p) => ({ ...p, pageIndex: i })),
    };


    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white ">
                <TableFilter filterData={tableFilterData} searchColumns={searchColumns} />
                <div className="max-w-full overflow-x-auto">
                    <table className={"min-w-full border-collapse"}>
                        <TableHeader columns={table.getHeaderGroups()[0]} />
                        <TableBody tableRows={table.getRowModel().rows} />
                    </table>
                </div>

                <TablePagination paginationData={tablePaginationData} />
            </div>
        </>
    );
}

export default BaseTable;
