import React, { useEffect, useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import BaseTable from '../../components/table/BaseTable';
import ActionColumn from '../../components/table/ActionColumn';
import { useAuth } from '../../context/AuthContext';
import { fetchEvaluations, formattedDate } from '../../services/evaluatorService';
import Spinner from '../../components/layout/Spinner';



const searchColumns = {
    evaluationID: "ID",
    evaluatorName: "Evaluator Name",
    submissionID: "Submission ID",
    topic: "Topic",
    teamName: "Team Name",
    totalScore: "Total Score"
}

const columns = [
    { accessorKey: "evaluationID", header: "ID" },
    { accessorKey: "evaluatorName", header: "Evaluator Name" },
    { accessorKey: "submissionID", header: "Submission ID" },
    { accessorKey: "teamName", header: "Team Name" },
    { accessorKey: "topic", header: "Topic" },
    { accessorKey: "totalScore", header: "Total Score" },
    { accessorKey: "createdAt", header: "Evaluated at" },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionColumn isView={true} viewPath={`view-evaluation/${row.original._id}`} />,
    },
];
const Evaluations = () => {
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
            const response = await fetchEvaluations(user.id, page, pageSize, searchColumn, searchText);
            const data = response.data;
            const formattedData = data.evaluations.map((row) => {
                return {
                    ...row,
                    createdAt: formattedDate(row.createdAt)
                }
            })
            setTableData(formattedData);
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
                    setSearchType={setSearchType}  ></BaseTable>
            </ComponentCard>
        </>
    );
}

export default Evaluations;
