import React from 'react';
import { TableCell, TableRow } from './TableComponents';
import { flexRender } from '@tanstack/react-table';

const TableHeader = ({ columns }) => {

    return (
        <>
            <thead className="border-b border-gray-100 ">
                <TableRow>
                    {columns.headers.map((header) => {
                        return <TableCell
                            key={header.id}
                            isHeader
                        >
                            {flexRender(header.column.columnDef?.header, header.getContext())}
                        </TableCell>
                    })}

                </TableRow>
            </thead>
        </>
    );
}

export default TableHeader;
