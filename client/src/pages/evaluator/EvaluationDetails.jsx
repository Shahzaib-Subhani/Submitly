import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import usePageTitle from '../../hooks/usePageTitle';
import { useAuth } from '../../context/AuthContext';
import { fetchEvaluationDetail, formattedDate } from '../../services/evaluatorService';
import Spinner from '../../components/layout/Spinner';
import ComponentCard from '../../components/layout/ComponentCard';
import DetailsCard from '../../components/dashboard/DetailsCard';
import EvaluationForm from '../../components/dashboard/EvaluationForm';

const labels = {
    evaluationID: "Evaluation ID",
    evaluatorName: "Evaluator Name",
    submissionID: "Submission ID",
    teamID: "Team ID",
    teamName: "Team Name",
    leaderName: "Leader Name",
    topic: "Topic",
    totalScore: "Total Score",
    evaluatedAt: "Evaluated At",
};

const fields = {
    relevance: "Relevance to Learning Objectives/Outcomes",
    innovation: "Innovation & Creativity",
    clarity: "Clarity and Accessibility",
    depth: "Depth",
    engagement: "Interactivity and Engagement",
    technology: "Use of Technology",
    scalability: "Scalability and Adaptability",
    ethics: "Alignment with Ethical Standards",
    application: "Practical Application",
    videoQuality: "Video Quality",

};
const EvaluationDetails = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const [evaluationData, setEvaluationData] = useState(true);
    const { user } = useAuth();
    const { evaluationID } = useParams();

    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const response = await fetchEvaluationDetail(evaluationID, user?.id);
                if (response?.data) {
                    const data = response.data;
                    const scores = Object.entries(data.scores).map(([key, val], index) => ({
                        srNo: index + 1,
                        name: key,
                        label: fields[key],
                        score: val
                    }));
                    const formattedData = {
                        evaluationID: data.evaluationID,
                        evaluatorName: data.evaluatorName,
                        submissionID: data.submissionID,
                        topic: data.topic,
                        teamID: data.teamID,
                        teamName: data.teamName,
                        leaderName: data.leaderName,
                        totalScore: data.totalScore,
                        feedback: data.feedback,
                        scores,
                        evaluatedAt: formattedDate(data.createdAt),
                    };

                    setEvaluationData(formattedData);

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchSubmissionDetails();
    }, [user.id, evaluationID]);
    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={evaluationData} />
                <EvaluationForm title={"Criteria Scores"} criteria={evaluationData.scores} total={evaluationData.totalScore} />
            </ComponentCard>
        </>
    );
}
export default EvaluationDetails;
