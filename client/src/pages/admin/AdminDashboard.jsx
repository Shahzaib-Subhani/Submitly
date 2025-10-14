import { FilePenLine, Send, UsersRoundIcon, UserStar } from 'lucide-react';
import CardHolder from '../../components/dashboard/CardHolder';
import NumberCard from '../../components/dashboard/NumberCard';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import { useEffect, useState } from 'react';
import { fetchDashboardDetails } from '../../services/adminService';
import Spinner from '../../components/layout/Spinner';

const AdminDashboard = () => {
  const pageTitle = usePageTitle();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard Data 
  useEffect(() => {
    const fetchDashboard = async () => {
      console.log("loaded");
      
      try {
        const response = await fetchDashboardDetails();
        if (response?.data) {
          setDashboard(response.data);
        } else {
          toast.error({ main: "No dashboard data found." });
          // setDashboard({

          // });
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
          <NumberCard title={"Teams"} number={dashboard?.teams} Icon={UsersRoundIcon} color={"bg-indigo-100 text-indigo-600"} />
          <NumberCard title={"Evaluators"} number={dashboard?.evaluators} Icon={UserStar} color={"bg-orange-100 text-orange-600"} />
          <NumberCard title={"Submissions"} number={dashboard?.submissions} Icon={Send} color={"bg-emerald-100 text-emerald-600"} />
          <NumberCard title={"Evaluations"} number={dashboard?.evaluations} Icon={FilePenLine} color={"bg-sky-100 text-sky-600"} />
        </CardHolder>
      </ComponentCard>
    </>
  );
}

export default AdminDashboard;
