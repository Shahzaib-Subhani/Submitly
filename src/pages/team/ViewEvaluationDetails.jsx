import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import DetailsCard from '../../components/dashboard/DetailsCard';
import EvaluationForm from '../../components/dashboard/EvaluationForm';
import TeamEvaluation from '../../components/dashboard/TeamEvaluation';


const labels = {
    teamName: "Team Name",
    topic: "Topic",
    videoURL: "Video Link",
    description: "Description",
    learningOutcomes: "Learning Outcomes",
    totalScore: "Total Average Score",
};
const criteriaScores = [
    { srNo: 1, label: "Relevance to Learning Objectives/Outcomes", max: 5, scores: { evaluator1: 4, evaluator2: 3, evaluator3: 5 }, average: 4 },
    { srNo: 2, label: "Innovation & Creativity", max: 15, scores: { evaluator1: 13, evaluator2: 12, evaluator3: 14 }, average: 13 },
    { srNo: 3, label: "Clarity and Accessibility", max: 10, scores: { evaluator1: 9, evaluator2: 8, evaluator3: 10 }, average: 9 },
    { srNo: 4, label: "Depth", max: 10, scores: { evaluator1: 5, evaluator2: 6, evaluator3: 5 }, average: 5.33 },
    { srNo: 5, label: "Interactivity and Engagement", max: 25, scores: { evaluator1: 24, evaluator2: 23, evaluator3: 25 }, average: 24 },
    { srNo: 6, label: "Use of Technology", max: 10, scores: { evaluator1: 5, evaluator2: 6, evaluator3: 5 }, average: 5.33 },
    { srNo: 7, label: "Scalability and Adaptability", max: 10, scores: { evaluator1: 9, evaluator2: 8, evaluator3: 10 }, average: 9 },
    { srNo: 8, label: "Alignment with Ethical Standards", max: 5, scores: { evaluator1: 3, evaluator2: 4, evaluator3: 3 }, average: 3.33 },
    { srNo: 9, label: "Practical Application", max: 10, scores: { evaluator1: 9, evaluator2: 10, evaluator3: 8 }, average: 9 },
    { srNo: 10, label: "Video Quality", max: 10, scores: { evaluator1: 6, evaluator2: 7, evaluator3: 6 }, average: 6 },
    { srNo: "total", label: "Total", max: 100, scores: { evaluator1: 87, evaluator2: 87, evaluator3: 91 }, average: 89 }
];

const evaluation = {
    teamName: "Team no. 1",
    topic: "Topic 1",
    videoURL: "https://example.com/video.mp4",
    description: "Improved adaptability, automated grading, personalized content delivery.",
    learningOutcomes: "A project exploring how AI can improve personalized learning.",
    totalScore: 89,
    evaluationRecord: criteriaScores,
    evaluatedAt: "03-12-2024 10:30 AM",
};


const ViewEvaluationDetails = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={evaluation} />
                <TeamEvaluation title={"Criteria Scores"} evaluation={evaluation.evaluationRecord} total={evaluation.totalScore} />
            </ComponentCard>
        </>
    );
}
export default ViewEvaluationDetails;
