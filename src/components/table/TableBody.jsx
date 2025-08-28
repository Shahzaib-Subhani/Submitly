import { TableCell, TableRow } from "./TableComponents";

const TableBody = ({ tableData }) => {
    return (
        <>
            <tbody>
                {tableData.map((row, indx) => (
                    <TableRow key={indx}>

                        <TableCell  > {row.user.name}</TableCell>
                        <TableCell > {row.projectName}</TableCell>
                        <TableCell > {row.team.images[0]}</TableCell>
                        <TableCell > {row.status}</TableCell>
                        <TableCell > {row.budget}</TableCell>

                    </TableRow>
                ))}
            </tbody>
        </>
    );
}

export default TableBody;
