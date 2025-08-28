import React from 'react';
import { TableCell, TableRow } from './TableComponents';

const TableHeader = ({ headers }) => {
    return (
        <>
            <thead className="border-b border-gray-100 ">
                <TableRow>
                    {headers.map((title, idx) => (
                        <TableCell
                            key={idx}
                            isHeader
                        >
                            {title}
                        </TableCell>
                    ))}

                </TableRow>
            </thead>
        </>
    );
}

export default TableHeader;
