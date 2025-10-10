import ComponentCard from "../../../components/layout/ComponentCard";
import ActionColumn from "../../../components/table/ActionColumn";
import BaseTable from "../../../components/table/BaseTable";
import usePageTitle from "../../../hooks/usePageTitle";
import TableBadge from "../../../components/table/TableBadge";
import Modal from "../../../components/layout/Modal";
import UseDeleteModal from "../../../hooks/useDeleteModal";
import { useEffect, useState } from "react";
import { deleteSubmission, fetchSubmissions } from "../../../services/adminService";
import toast from "react-hot-toast";
import { formattedDate } from "../../../services/evaluatorService";
import Spinner from "../../../components/layout/Spinner";

const searchColumns = {
  submissionID: "Submission ID",
  teamName: "Team Name",
  topic: "Topic",
  status: "Status"
};


const SubmissionList = () => {
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

  const fetchSubmissionsList = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
    try {
      const response = await fetchSubmissions(page, pageSize, searchColumn, searchText);
      const data = response.data;
      const formattedData = data.submissions.map((row) => {
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
    }
  };

  const handleOpenDelete = (submissionID) => {
    openDeleteModal(
      submissionID,
      () => deleteSubmission(submissionID),
      () => fetchSubmissionsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType)
    );
  };

  useEffect(() => {
    fetchSubmissionsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
  }, [pagination.pageIndex, pagination.pageSize, search]);

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
      cell: ({ row }) => <ActionColumn
        isDelete={true}
        isView={true}
        viewPath={`view-submission/${row.original._id}`}
        isTextBtn={true}
        textBtnLabel="Assign Evaluator"
        textBtnPath={`assign-evaluator/${row.original._id}`}
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

export default SubmissionList;
