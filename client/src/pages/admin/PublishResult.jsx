import ComponentCard from "../../components/layout/ComponentCard";
import BaseTable from "../../components/table/BaseTable";
import usePageTitle from "../../hooks/usePageTitle";
const tableData = [
    {
        id: "",
        teamLead: "",
        relevance: 5,
        innovation: 15,
        clarity: 10,
        depth: 5,
        engagement: 25,
        technology: 5,
        scalability: 10,
        ethics: 5,
        practical: 10,
        videoQuality: 10,
        total: 100,
    },
    {
        id: 1,
        teamLead: "Adnan Asif",
        relevance: 0,
        innovation: 5,
        clarity: 5,
        depth: 5,
        engagement: 10,
        technology: 2,
        scalability: 2,
        ethics: 1,
        practical: 2,
        videoQuality: 6,
        total: 35,
    },
    {
        id: 2,
        teamLead: "Sara Khan",
        relevance: 3,
        innovation: 12,
        clarity: 8,
        depth: 4,
        engagement: 20,
        technology: 4,
        scalability: 7,
        ethics: 3,
        practical: 9,
        videoQuality: 8,
        total: 78,
    },
    {
        id: 3,
        teamLead: "Ali Raza",
        relevance: 4,
        innovation: 10,
        clarity: 9,
        depth: 5,
        engagement: 18,
        technology: 5,
        scalability: 6,
        ethics: 4,
        practical: 7,
        videoQuality: 9,
        total: 77,
    },
];


const columns = [
    { accessorKey: "id", header: "Sr. #" },
    { accessorKey: "teamLead", header: "Name of Team Lead" },
    { accessorKey: "relevance", header: "Relevance to LOs & Outcomes" },
    { accessorKey: "innovation", header: "Innovation & Creativity" },
    { accessorKey: "clarity", header: "Clarity & Accessibility" },
    { accessorKey: "depth", header: "Depth" },
    { accessorKey: "engagement", header: "Interactivity & Engagement" },
    { accessorKey: "technology", header: "Use of Technology" },
    { accessorKey: "scalability", header: "Scalability & Adaptability" },
    { accessorKey: "ethics", header: "Alignment with Ethical Standards" },
    { accessorKey: "practical", header: "Practical Application" },
    { accessorKey: "videoQuality", header: "Video Quality" },
    { accessorKey: "total", header: "Evaluation Score" },
];
const PublishResult = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <BaseTable tableHeaders={columns} tableData={tableData}  ></BaseTable>
            </ComponentCard>
        </>
    );
}

export default PublishResult;
