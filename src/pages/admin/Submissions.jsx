import ComponentCard from "../../components/layout/ComponentCard";
import ActionColumn from "../../components/table/ActionColumn";
import BaseTable from "../../components/table/BaseTable";
import usePageTitle from "../../hooks/usePageTitle";
import TableBadge from "../../components/table/TableBadge";

function getRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const pad = (n) => String(n).padStart(2, "0");

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${hours}:${pad(minutes)} ${ampm}`;
}


const tableData = [...Array(20)].map((_, i) => ({
  id: i + 1,
  teamName: `Team ${i + 1}`,
  topic: `topic ${i + 1}`,
  lastUpdated: getRandomDate(),
  status: "active",
}));

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "teamName", header: "Team Name" },
  { accessorKey: "topic", header: "Topic" },
  { accessorKey: "lastUpdated", header: "Last updated" },
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
    cell: () => <ActionColumn isDelete={true} isView={true} isTextBtn={true} textBtnLabel="Assign Evaluator" />,
  },
];

const SubmissionList = () => {
  const pageTitle = usePageTitle();
  return (
    <>
      <ComponentCard title={pageTitle}>
        <BaseTable tableHeaders={columns} tableData={tableData}  ></BaseTable>
      </ComponentCard>
    </>
  );
}

export default SubmissionList;
