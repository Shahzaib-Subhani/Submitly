import { Send, UsersRoundIcon, UserStar } from 'lucide-react';
import CardHolder from '../../components/dashboard/CardHolder';
import NumberCard from '../../components/dashboard/NumberCard';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';

const AdminDashboard = () => {
  const pageTitle = usePageTitle();

  return (
    <>
      <ComponentCard title={pageTitle}>
        <CardHolder>
          <NumberCard title={"Teams"} number={"3,567"} Icon={UsersRoundIcon} color={"bg-indigo-100 text-indigo-600"} />
          <NumberCard title={"Evaluators"} number={"547"} Icon={UserStar} color={"bg-orange-100 text-orange-600"} />
          <NumberCard title={"Submissions"} number={"3,345"} Icon={Send} color={"bg-emerald-100 text-emerald-600"} />
        </CardHolder>
      </ComponentCard>
    </>
  );
}

export default AdminDashboard;
