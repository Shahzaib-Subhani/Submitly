
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import ComponentCard from '../../components/layout/ComponentCard';
import DetailsCard from '../../components/dashboard/DetailsCard';
import { EvaluateSubmissionSchema } from '../../validations/adminSchemas';
import EvaluationForm from '../../components/dashboard/EvaluationForm';
import { evaluateSubmission, fetchEvaluatorSubmissionDetail, formattedDate } from '../../services/evaluatorService';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/layout/Spinner';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
const labels = {
    teamID: "Team",
    teamName: "Team Name",
    leaderName: "Leader Name",
    topic: "Topic",
    videoURL: "Video Link",
    description: "Description",
    learningOutcomes: "Learning Outcomes",
    status: "Status",
    lastUpdated: "Last Updated"
};



const formFields = [
    { srNo: 1, label: "Relevance to Learning Objectives/Outcomes", name: "relevance", type: "number", max: 5 },
    { srNo: 2, label: "Innovation & Creativity", name: "innovation", type: "number", max: 15 },
    { srNo: 3, label: "Clarity and Accessibility", name: "clarity", type: "number", max: 10 },
    { srNo: 4, label: "Depth", name: "depth", type: "number", max: 5 },
    { srNo: 5, label: "Interactivity and Engagement", name: "engagement", type: "number", max: 25 },
    { srNo: 6, label: "Use of Technology", name: "technology", type: "number", max: 5 },
    { srNo: 7, label: "Scalability and Adaptability", name: "scalability", type: "number", max: 10 },
    { srNo: 8, label: "Alignment with Ethical Standards", name: "ethics", type: "number", max: 5 },
    { srNo: 9, label: "Practical Application", name: "application", type: "number", max: 10 },
    { srNo: 10, label: "Video Quality", name: "videoQuality", type: "number", max: 10 },

];

const EvaluateSubmission = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const [submissionData, setSubmissionData] = useState(true);
    const { user } = useAuth();
    const { submissionID } = useParams();

    const { formData, errors, handleSubmit, setFormData, setErrors, loading } = useForm(
        EvaluateSubmissionSchema,
        {
            relevance: 0,
            innovation: 0,
            clarity: 0,
            depth: 0,
            engagement: 0,
            technology: 0,
            scalability: 0,
            ethics: 0,
            application: 0,
            videoQuality: 0,
            total: 0,
            feedback: ""
        },
        async (values) => {
            const { total, feedback, ...scores } = values;
            const formattedData = {
                evaluatorID: user.id,
                scores,
                feedback
            };
            const response = await evaluateSubmission(submissionID, formattedData);
            const successMsg = {
                main: response?.message || "Submission evaluated successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
            
        }
    );

    // Fetch submission data
    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const response = await fetchEvaluatorSubmissionDetail(submissionID, user?.id);
                if (response?.data) {
                    setSubmissionData({
                        submissionID: response.data.submissionID,
                        teamID: response.data.teamID.teamID,
                        teamName: response.data.teamID.teamName,
                        leaderName: response.data.teamID.leaderName,
                        topic: response.data.topic,
                        videoURL: response.data.videoURL,
                        learningOutcomes: response.data.learningOutcomes,
                        status: response.data.status,
                        isFinal: true,
                        lastUpdated: formattedDate(response.data.updatedAt),
                        description: response.data.description,
                    });

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchSubmissionDetails();
    }, [user._id, setFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            const total = Object.entries(updated)
                .filter(([key]) => key !== "total")
                .reduce((sum, [, val]) => sum + (parseFloat(val) || 0), 0);

            return { ...updated, total };
        });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} title={"Submission Details"} data={submissionData} />
                <EvaluationForm
                    title={"Evaluate Submission"}
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    errors={errors}
                    loading={loading}
                    editable={true}

                />

            </ComponentCard>
        </>
    );
}

export default EvaluateSubmission;
