import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import ComponentCard from '../../../components/layout/ComponentCard';
import DetailsCard from '../../../components/dashboard/DetailsCard';
import EvaluationDetails from '../../../components/dashboard/EvaluationDetails';

const labels = {
    evaluationID: "ID",
    evaluatorName: "Evaluator Name",
    submissionID: "Submission ID",
    teamName: "Team Name",
    topic: "Topic",
    totalScore: "Total Score",
    evaluatedAt: "Evaluated At",
};

const evaluation = {
    evaluationID: 1,
    evaluatorName: "Evaluator 1",
    submissionID: 1,
    topic: "AI in Education",
    teamName: "Team no. 1",
    totalScore: 89,
    criteriaScore: [
        { srNo: 1, label: "Relevance to Learning Objectives/Outcomes", score: 4 },
        { srNo: 2, label: "Innovation & Creativity",score: 13 },
        { srNo: 3, label: "Clarity and Accessibility", score: 9 },
        { srNo: 4, label: "Depth", score: 5 },
        { srNo: 5, label: "Interactivity and Engagement",score: 24 },
        { srNo: 6, label: "Use of Technology", score: 5 },
        { srNo: 7, label: "Scalability and Adaptability", score: 9 },
        { srNo: 8, label: "Alignment with Ethical Standards", score: 3 },
        { srNo: 9, label: "Practical Application", score: 9 },
        { srNo: 10, label: "Video Quality", score: 6 },
    ],
    evaluatedAt: "03-12-2024 10:30 AM",
};
const ViewEvaluation = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={evaluation} />
                <EvaluationDetails title={"Criteria Scores"} criteria={evaluation.criteriaScore} total={evaluation.totalScore} />
            </ComponentCard>
        </>
    );
}
export default ViewEvaluation;
