import { useEffect, useState } from "react";
import ComponentCard from "../../components/layout/ComponentCard";
import Modal from "../../components/layout/Modal";
import ActionColumn from "../../components/table/ActionColumn";
import BaseTable from "../../components/table/BaseTable";
import TableBadge from "../../components/table/TableBadge";
import UseDeleteModal from "../../hooks/useDeleteModal";
import usePageTitle from "../../hooks/usePageTitle";
import { approveEvaluator, deleteEvaluator, fetchEvaluators } from "../../services/adminService";
import toast from "react-hot-toast";
import Spinner from "../../components/layout/Spinner";

const searchColumns = {
  evaluatorID: "Evaluator ID",
  name: "Name",
  email: "Email",
  qualification: "Qualification",
  experience: "Experience",
  status: "Status"
};

const EvaluatorsList = () => {
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

  const fetchEvaluatorsList = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
    try {
      const response = await fetchEvaluators(page, pageSize, searchColumn, searchText);
      const data = response.data;

      setTableData(data.evaluators);
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

  const handleOpenDelete = (evaluatorID) => {
    openDeleteModal(
      evaluatorID,
      () => deleteEvaluator(evaluatorID),
      () => fetchEvaluatorsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType)
    );
  };

  const handleApproveEvaluator = async (evaluatorID) => {
    try {
      const body = {
        status: "approved"
      }
      
      const response = await approveEvaluator(evaluatorID, body);
      toast.success({ main: "Evaluator approved successfully" });
      fetchEvaluatorsList();
    } catch (error) {
      toast.error({ main: error.message || "Failed to approve evaluator" });
    }
  };

  useEffect(() => {
    fetchEvaluatorsList(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
  }, [pagination.pageIndex, pagination.pageSize, search]);

  const columns = [
    { accessorKey: "evaluatorID", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "qualification", header: "Qualification" },
    { accessorKey: "experience", header: "Experience" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <TableBadge variant={"light"}
        color={row.original.status === "pending" ? "amber" : "emerald"}>{row.original.status}</TableBadge>
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => <ActionColumn
        isDelete={true}
        isEdit={true}
        editPath={`edit-evaluator/${row.original._id}`}
        onDelete={() => handleOpenDelete(row.original._id)}
        isTextBtn={row.original.status === "pending" ? true : false}
        textBtnLabel={"Approve"}
        textBtnClick={() => handleApproveEvaluator(row.original._id)}
      />,
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
          setSearchType={setSearchType}
        ></BaseTable>
        <Modal isOpen={isOpen} title={"Delete Confirmation"} message={"Are you sure to delete this record ?"} onClose={closeDeleteModal}
          onConfirm={() => confirmDelete()} />
      </ComponentCard>
    </>
  );
}

export default EvaluatorsList;
