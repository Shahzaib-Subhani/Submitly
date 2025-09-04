import React from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import BaseTable from '../../../components/table/BaseTable';
import ActionColumn from '../../../components/table/ActionColumn';
import usePageTitle from '../../../hooks/usePageTitle';

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
    id: i + 2,
    evaluatorName: `Evaluator ${i + 2}`,
    submissionId: `${i + 2}`,
    teamName: `Team ${i + 2}`,
    topic: `topic ${i + 2}`,
    totalScore: `${i + 2}`,
    evaluatedAt: getRandomDate(),
}));

const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "evaluatorName", header: "Evaluator Name" },
    { accessorKey: "submissionId", header: "Submission ID" },
    { accessorKey: "teamName", header: "Team Name" },
    { accessorKey: "topic", header: "Topic" },
    { accessorKey: "totalScore", header: "Total Score" },
    { accessorKey: "evaluatedAt", header: "Last updated" },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: () => <ActionColumn isView={true} viewPath='view-evaluation' />,
    },
];
const EvaluationsList = () => {
    const pageTitle = usePageTitle();

    return (
        <ComponentCard title={pageTitle}>
            <BaseTable tableHeaders={columns} tableData={tableData}  ></BaseTable>
        </ComponentCard>
    );
}

export default EvaluationsList;
