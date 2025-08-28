
import TableHeader from "./TableHeader";




const BaseTable = ({ headers, children }) => {
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white ">
                <div className="max-w-full overflow-x-auto">
                    <table className={"min-w-full border-collapse"}>
                        <TableHeader headers={headers} />
                        {children}
                        
                    </table>
                </div>
            </div>
        </>
    );
}

export default BaseTable;
