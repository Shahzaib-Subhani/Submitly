import ComponentCard from "../../components/layout/ComponentCard";
import usePageTitle from "../../hooks/usePageTitle";

const EvaluatorsList = () => {
  const pageTitle = usePageTitle();
  return (
    <>
      <ComponentCard title={pageTitle}>

      </ComponentCard>
    </>
  );
}

export default EvaluatorsList;
