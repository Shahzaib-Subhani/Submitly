import ComponentCard from "../../components/layout/ComponentCard";
import ActionColumn from "../../components/table/ActionColumn";
import BaseTable from "../../components/table/BaseTable";
import TableBadge from "../../components/table/TableBadge";
import usePageTitle from "../../hooks/usePageTitle";

const tableData = [...Array(20)].map((_, i) => ({
  id: i + 1,
  name: `Evaluator ${i + 1}`,
  email: `evaluator${i + 1}@example.com`,
  qualification: `qualification ${i + 1}`,
  experience: `experience ${i + 1}`,
  status: "active",
}));

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "qualification", header: "Qualification" },
  { accessorKey: "experience", header: "Experience" },
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
    cell: () => <ActionColumn isDelete={true} isEdit={true} editPath={"edit-evaluator"} />,
  },
];
const EvaluatorsList = () => {
  const pageTitle = usePageTitle();
  return (
    <>
      <ComponentCard title={pageTitle}>
        <BaseTable tableHeaders={columns} tableData={tableData}  ></BaseTable>
      </ComponentCard>
    </>
  );
}

export default EvaluatorsList;
