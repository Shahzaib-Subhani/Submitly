

// TableRow Component
const TableRow = ({ children, className }) => {
    return <tr className={className}>{children}</tr>;
};

// Table Cell Component
const TableCell = ({ children, className, isHeader = false }) => {
    const CellTag = isHeader ? "th" : "td";
    const cellClassName = isHeader
        ? "px-4 py-3 border border-gray-200 text-start font-medium text-gray-700 text-md"
        : "px-4 py-4 font-normal text-gray-800 border border-gray-200 whitespace-nowrap text-sm";
    return <CellTag className={`${cellClassName} ${className}`}>{children}</CellTag>;
}


export { TableRow, TableCell };
