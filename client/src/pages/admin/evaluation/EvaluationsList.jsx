import React, { useEffect, useState } from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import BaseTable from '../../../components/table/BaseTable';
import ActionColumn from '../../../components/table/ActionColumn';
import usePageTitle from '../../../hooks/usePageTitle';
import Spinner from '../../../components/layout/Spinner';
import toast from 'react-hot-toast';
import { fetchEvaluations } from '../../../services/adminService';
import { formattedDate } from '../../../services/evaluatorService';

const searchColumns = {
    evaluationID: "Evaluation ID",
    evaluatorName: "Evaluator Name",
    submissionID: "Submission ID",
    teamName: "Team Name",
    topic: "Topic",
    totalScore: "Total Score"
};
const columns = [
    { accessorKey: "evaluationID", header: "ID" },
    { accessorKey: "evaluatorName", header: "Evaluator Name" },
    { accessorKey: "submissionID", header: "Submission ID" },
    { accessorKey: "teamName", header: "Team Name" },
    { accessorKey: "topic", header: "Topic" },
    { accessorKey: "totalScore", header: "Total Score" },
    { accessorKey: "updatedAt", header: "Evaluated At" },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => <ActionColumn isView={true} viewPath={`view-evaluation/${row.original._id}`} />,
    },
];
const EvaluationsList = () => {
    const pageTitle = usePageTitle();
    const [tableData, setTableData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

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

    const fetchEvaluationList = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
        try {
            const response = await fetchEvaluations(page, pageSize, searchColumn, searchText);
            const data = response.data;
            const formattedData = data.evaluations.map((row) => {
                return {
                    ...row,
                    updatedAt: formattedDate(row.updatedAt)
                }
            });
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
        fetchEvaluationList(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
    }, [pagination.pageIndex, pagination.pageSize, search]);

    if (dataLoading) return <Spinner />;

    return (
        <ComponentCard title={pageTitle}>
            <BaseTable tableHeaders={columns} tableData={tableData} searchColumns={searchColumns}
                pagination={pagination}
                setPagination={setPagination}
                search={search}
                paginationInfo={paginationInfo}
                setSearch={setSearch}
                setSearchType={setSearchType} ></BaseTable>
        </ComponentCard>
    );
}

export default EvaluationsList;
