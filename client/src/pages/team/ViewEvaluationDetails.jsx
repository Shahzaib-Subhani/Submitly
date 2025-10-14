
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import DetailsCard from '../../components/dashboard/DetailsCard';
import TeamEvaluation from '../../components/dashboard/TeamEvaluation';
import { useEffect, useState } from 'react';
import { fetchEvaluationDetails, transformEvaluationData } from '../../services/teamService';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/layout/Spinner';
import FeedbackSection from '../../components/dashboard/FeedbackSection';


const labels = {
    teamName: "Team Name",
    topic: "Topic",
    videoURL: "Video Link",
    description: "Description",
    learningOutcomes: "Learning Outcomes",
    status: "Status",
    totalScore: "Total Average Score",
};
const DEFAULT_EVALUATION = {
    teamName: "-",
    topic: "-",
    videoURL: "-",
    description: "-",
    learningOutcomes: "-",
    totalScore: "-",
    status: "-",
    evaluationRecord: [],
};

// Define your criteria in one place
const CRITERIA_KEYS = [
    { key: "relevance", label: "Relevance to Learning Objectives/Outcomes", max: 5 },
    { key: "innovation", label: "Innovation & Creativity", max: 15 },
    { key: "clarity", label: "Clarity and Accessibility", max: 10 },
    { key: "depth", label: "Depth", max: 10 },
    { key: "engagement", label: "Interactivity and Engagement", max: 25 },
    { key: "technology", label: "Use of Technology", max: 10 },
    { key: "scalability", label: "Scalability and Adaptability", max: 10 },
    { key: "ethics", label: "Alignment with Ethical Standards", max: 5 },
    { key: "application", label: "Practical Application", max: 10 },
    { key: "videoQuality", label: "Video Quality", max: 10 },
];


const ViewEvaluationDetails = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [evaluation, setEvaluation] = useState(null);
    const [loading, setLoading] = useState(true);



    // Fetch evaluation data
    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await fetchEvaluationDetails(user?._id);
                if (response?.data) {
                    setEvaluation(transformEvaluationData(response.data, CRITERIA_KEYS));
                } else {
                    toast.error({ main: "No evaluation data found." });
                    setEvaluation(DEFAULT_EVALUATION);
                }
            } catch (error) {
                console.error(error);
                toast.error({ main: error.message || "Failed to fetch evaluation." });
                setEvaluation(DEFAULT_EVALUATION);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) fetchEvaluation();
    }, [user?._id]);
    if (loading) return <Spinner />;

    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={evaluation} />
                <FeedbackSection feedbacks={evaluation.feedbacks}/>
                <TeamEvaluation title={"Criteria Scores"} evaluation={evaluation.evaluationRecord} total={evaluation.totalScore} />
            </ComponentCard>
        </>
    );
}
export default ViewEvaluationDetails;
