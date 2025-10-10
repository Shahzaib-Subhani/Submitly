import { useEffect, useState } from "react";
import ComponentCard from "../../components/layout/ComponentCard";
import ActionColumn from "../../components/table/ActionColumn";
import BaseTable from "../../components/table/BaseTable";
import TableBadge from "../../components/table/TableBadge";
import usePageTitle from "../../hooks/usePageTitle";
import { fetchEvaluatorSubmissions } from "../../services/evaluatorService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../../components/layout/Spinner";


const columns = [
    { accessorKey: "submissionID", header: "ID" },
    { accessorKey: "teamName", header: "Team Name" },
    { accessorKey: "topic", header: "Topic" },
    { accessorKey: "updatedAt", header: "Last updated" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <TableBadge variant={"light"}
            color={"emerald"}>{row.original.status}</TableBadge>
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionColumn isTextBtn={true} textBtnLabel="Evaluate" textBtnPath={`evaluate-submission/${row.original._id}`} />,
    },
];

const searchColumns = {
    submissionID: "ID",
    teamName: "Team Name",
    topic: "Topic",
    status: "Status",
}


const SubmissionList = () => {
    const pageTitle = usePageTitle();
    const [tableData, setTableData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const { user } = useAuth();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const [paginationInfo, setPaginationInfo] = useState({
        totalRecords: 0,
        totalPages: 1,
        fromRecord: 0,
        toRecord: 0,
    });
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("");

    const fetchSubmissions = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
        try {
            const response = await fetchEvaluatorSubmissions(user.id, page, pageSize, searchColumn, searchText);
            const data = response.data;

            setTableData(data.submissions);
            const backendPagination = data.pagination;

            setPagination({
                pageIndex: backendPagination.currentPage - 1,
                pageSize: backendPagination.pageSize,

            });

            setPaginationInfo({
                totalRecords: backendPagination.totalRecords,
                totalPages: backendPagination.totalPages,
                fromRecord: backendPagination.fromRecord,
                toRecord: backendPagination.toRecord,
            });
        } catch (error) {
            toast.error({ main: error.message, sub: error.error });
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
    }, [pagination.pageIndex, pagination.pageSize, search]);

    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <BaseTable tableHeaders={columns} tableData={tableData} searchColumns={searchColumns}
                    pagination={pagination}
                    setPagination={setPagination}
                    search={search}
                    paginationInfo={paginationInfo}
                    setSearch={setSearch}
                    setSearchType={setSearchType}></BaseTable>
            </ComponentCard>
        </>
    );
}

export default SubmissionList;
