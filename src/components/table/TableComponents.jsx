import React from 'react';


// TableRow Component
const TableRow = ({ children, className }) => {
    return <tr className={className}>{children}</tr>;
};

// Table Cell Component
const TableCell = ({ children, className, isHeader = false }) => {
    const CellTag = isHeader ? "th" : "td";
    const cellClassName = isHeader
        ? "px-5 py-3 font-medium text-gray-700 text-start text-md"
        : "px-4 py-3 text-gray-600 text-start text-sm";
    return <CellTag className={`${cellClassName} ${className}`}>{children}</CellTag>;
}


export { TableRow, TableCell };
