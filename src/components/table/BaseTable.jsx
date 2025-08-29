
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import TableFilter from "./TableFilter";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableBody from "./TableBody";
import { useMemo, useState } from "react";




const BaseTable = ({ tableHeaders, tableData }) => {

    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 15,
    });

    // server-side logic
    const filteredData = useMemo(() => {
        if (!globalFilter) return tableData;
        const filter = globalFilter.toLowerCase();
        return tableData.filter((row) =>
            Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(filter)
        );
    }, [globalFilter]);

    const paginatedData = useMemo(() => {
        const start = pagination.pageIndex * pagination.pageSize;
        return filteredData.slice(start, start + pagination.pageSize);
    }, [filteredData, pagination]);

    const table = useReactTable({
        data: paginatedData,
        columns: tableHeaders,
        pageCount: Math.ceil(filteredData.length / pagination.pageSize),
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        manualFiltering: true,
    });

    const tableFilterData = {
        handleSearch: (input) => {
            setGlobalFilter(input);
        },
        handleSetPageSize: (size) => {
            setPagination((prev) => ({
                ...prev,
                pageSize: size
            }))
        }
    }

    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = tableData.length;

    const tablePaginationData = {
        index: pageIndex,
        totalRecords: totalRows,
        fromRecord: pageIndex * pageSize + 1,
        toRecord: Math.min((pageIndex + 1) * pageSize, totalRows),
        canNext: table.getCanNextPage(),
        canPrev: table.getCanPreviousPage(),
        totalPages: table.getPageCount(),
        handlePrev: () => {
            table.previousPage()
        },
        handleNext: () => {
            table.nextPage()
        },
        handlePageIndex: (i) => {
            table.setPageIndex(i)
        }
    }


    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white ">
                <TableFilter filterData={tableFilterData} />
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
