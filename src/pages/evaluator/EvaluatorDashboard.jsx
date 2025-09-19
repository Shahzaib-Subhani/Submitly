import { Send, UsersRoundIcon, UserStar } from 'lucide-react';
import CardHolder from '../../components/dashboard/CardHolder';
import NumberCard from '../../components/dashboard/NumberCard';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';

const EvaluatorDashboard = () => {
  const pageTitle = usePageTitle();
  return (
    <>
      <ComponentCard title={pageTitle}>
        <CardHolder>
          <NumberCard title={"Assigned Submissions"} number={"567"} Icon={UsersRoundIcon} color={"bg-indigo-100 text-indigo-600"} />
          <NumberCard title={"Evaluated Submissions"} number={"300"} Icon={UserStar} color={"bg-emerald-100 text-emerald-600"} />
          <NumberCard title={"Pending Submissions"} number={"247"} Icon={UserStar} color={"bg-orange-100 text-orange-600"} />
          {/* <NumberCard title={"Submissions"} number={"345"} Icon={Send} color={"bg-emerald-100 text-emerald-600"} /> */}
        </CardHolder>
      </ComponentCard>
    </>
  );
}

export default EvaluatorDashboard;
