import TableBody from "./TableBody";
import TableHeader from "./TableHeader";




const BaseTable = ({ headers, tableData }) => {
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white ">
                <div className="max-w-full overflow-x-auto">
                    <table className={"min-w-full border-collapse"}>
                        <TableHeader headers={headers} />
                        <TableBody tableData={tableData} />
                    </table>
                </div>
            </div>
        </>
    );
}

export default BaseTable;
