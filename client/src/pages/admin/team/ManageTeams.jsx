
import BaseTable from '../../../components/table/BaseTable';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import { TableCell, TableRow } from '../../../components/table/TableComponents';
import ActionColumn from '../../../components/table/ActionColumn';
import Modal from '../../../components/layout/Modal';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UseDeleteModal from '../../../hooks/useDeleteModal';
import { useAuth } from '../../../context/AuthContext';
import { deleteTeam, fetchTeams } from '../../../services/adminService';
import Spinner from '../../../components/layout/Spinner';

const searchColumns = {
    teamID: "Team ID",
    email: "Email",
    leaderName: "Leader Name",
    teamName: "Team Name"
};


const ManageTeams = () => {

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
    const {
        isOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    } = UseDeleteModal();

    const fetchTeamsList = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
        try {
            const response = await fetchTeams(page, pageSize, searchColumn, searchText);
            const data = response.data;

            setTableData(data.teams);
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

    const handleOpenDelete = (teamID) => {
        openDeleteModal(
            teamID,
            () => deleteTeam(teamID),
            () => fetchTeamsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType)
        );
    };

    useEffect(() => {
        fetchTeamsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
    }, [pagination.pageIndex, pagination.pageSize, search]);

    const columns = [
        { accessorKey: "teamID", header: "ID" },
        { accessorKey: "teamName", header: "Team Name" },
        { accessorKey: "leaderName", header: "Leader Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "memberCount", header: "Members" },
        {
            id: "actions",
            accessorKey: "members",
            header: "Actions",
            cell: ({ row }) => <ActionColumn
                isDelete={true}
                isView={true}
                viewPath={`view-team/${row.original._id}`}
                isEdit={true}
                editPath={`edit-team/${row.original._id}`}
                onDelete={() => handleOpenDelete(row.original._id)} />,
        },
    ];
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
                <Modal isOpen={isOpen} title={"Delete Confirmation"} message={"Are you sure to delete this record ?"} onClose={closeDeleteModal}
                    onConfirm={() => confirmDelete()} />
            </ComponentCard>
        </>
    );
}

export default ManageTeams;
