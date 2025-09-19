import React from 'react';
import { TableCell, TableRow } from './TableComponents';
import { flexRender } from '@tanstack/react-table';

const TableBody = ({ tableRows }) => {
    return (
        <>
            <tbody>
                {tableRows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>

                        ))}

                    </TableRow>
                ))}
            </tbody>
        </>
    );
}

export default TableBody;
