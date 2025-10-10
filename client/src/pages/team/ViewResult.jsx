
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import BaseTable from '../../components/table/BaseTable';
import { useEffect, useState } from 'react';
import { fetchTeamLeaderboard } from '../../services/teamService';
import toast from 'react-hot-toast';
import Spinner from '../../components/layout/Spinner';

const columns = [
  { accessorKey: "id", header: "Sr. #" },
  { accessorKey: "leaderName", header: "Name of Team Lead" },
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

const searchColumns = {
  leaderName: "Leader Name",
  teamName: "Team Name",
  totalScore: "Total Score",
};

const ViewResult = () => {
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

  const fetchLeaderboardResult = async (page = 1, pageSize = 5, searchText = "", searchColumn = "") => {
    try {
      const response = await fetchTeamLeaderboard(page, pageSize, searchColumn, searchText);
      const data = response.data;

      if (response.status) {
        const leaderboard = data.leaderboard.map((item, index) => ({
          id: index + 1,
          leaderName: item.leaderName,
          teamName: item.teamName,
          relevance: item.scores.relevance,
          innovation: item.scores.innovation,
          clarity: item.scores.clarity,
          depth: item.scores.depth,
          engagement: item.scores.engagement,
          technology: item.scores.technology,
          scalability: item.scores.scalability,
          ethics: item.scores.ethics,
          practical: item.scores.application,
          videoQuality: item.scores.videoQuality,
          total: item.totalScore,
        }));

        setTableData(leaderboard);
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
      }
    } catch (error) {
      toast.error({ main: error.message, sub: error.error });
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardResult(pagination.pageIndex + 1, pagination.pageSize, search, searchType);
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
          setSearchType={setSearchType}
        ></BaseTable>
      </ComponentCard>
    </>
  );
}

export default ViewResult;
