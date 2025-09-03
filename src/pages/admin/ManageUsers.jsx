
import BaseTable from '../../components/table/BaseTable';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import { TableCell, TableRow } from '../../components/table/TableComponents';
import ActionColumn from '../../components/table/ActionColumn';
import Modal from '../../components/layout/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import UseDeleteModal from '../../hooks/useDeleteModal';

const tableData = [...Array(40)].map((_, i) => ({
    id: i + 1,
    teamName: `Team ${i + 1}`,
    leaderName: `Leader ${i + 1}`,
    email: `leader${i + 1}@example.com`,
    members: Math.floor(Math.random() * 5) + 1,
}));



const ManageUsers = () => {

    const pageTitle = usePageTitle();
    const {
        isOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    } = UseDeleteModal();

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "teamName", header: "Team Name" },
        { accessorKey: "leaderName", header: "Leader Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "members", header: "Members" },
        {
            id: "actions",
            accessorKey: "members",
            header: "Actions",
            cell: () => <ActionColumn
                isDelete={true}
                isView={true}
                isEdit={true}
                editPath={'edit-user'}
                isTextBtn={true}
                textBtnLabel={'Edit Members'}
                textBtnPath={"edit-members"}
                onDelete={openDeleteModal} />,
        },
    ];
    return (
        <>
            <ComponentCard title={pageTitle}>
                <BaseTable tableHeaders={columns} tableData={tableData}  ></BaseTable>
                <Modal isOpen={isOpen} title={"Delete Confirmation"} message={"Are you sure to delete this record ?"} onClose={closeDeleteModal}
                    onConfirm={() => confirmDelete("User")} />
            </ComponentCard>
        </>
    );
}

export default ManageUsers;
