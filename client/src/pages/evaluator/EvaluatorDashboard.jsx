import { Send, UsersRoundIcon, UserStar } from 'lucide-react';
import CardHolder from '../../components/dashboard/CardHolder';
import NumberCard from '../../components/dashboard/NumberCard';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Spinner from '../../components/layout/Spinner';
import { useEffect, useState } from 'react';
import { fetchDashboardDetails } from '../../services/evaluatorService';

const EvaluatorDashboard = () => {
  const pageTitle = usePageTitle();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard Data 
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetchDashboardDetails();
        if (response?.data) {
          setDashboard(response.data);
        } else {
          toast.error({ main: "No dashboard data found." });
          setDashboard({
            submissions: "0",
            evaluations: "0",
            pendingSubmissions: "0"
          });
        }
      } catch (error) {
        console.error(error);
        toast.error({ main: error.message || "Failed to fetch data." });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  if (loading) return <Spinner />;

  return (
    <>
      <ComponentCard title={pageTitle}>
        <CardHolder>
          <NumberCard title={"Assigned Submissions"} number={dashboard.submissions} Icon={UsersRoundIcon} color={"bg-indigo-100 text-indigo-600"} />
          <NumberCard title={"Evaluated Submissions"} number={dashboard.evaluations} Icon={UserStar} color={"bg-emerald-100 text-emerald-600"} />
          <NumberCard title={"Pending Submissions"} number={dashboard.pendingSubmissions} Icon={UserStar} color={"bg-orange-100 text-orange-600"} />
          {/* <NumberCard title={"Submissions"} number={"345"} Icon={Send} color={"bg-emerald-100 text-emerald-600"} /> */}
        </CardHolder>
      </ComponentCard>
    </>
  );
}

export default EvaluatorDashboard;
