import React, { useEffect, useState } from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import ComponentCard from '../../../components/layout/ComponentCard';
import FormRenderer from '../../../components/forms/FormRenderer';
import useForm from '../../../hooks/useForm';
import { AssignEvaluatorSchema } from '../../../validations/adminSchemas';
import DetailsCard from '../../../components/dashboard/DetailsCard';
import Spinner from '../../../components/layout/Spinner';
import toast from 'react-hot-toast';
import { formattedDate } from '../../../services/evaluatorService';
import { assignSubmission, fetchEvaluatorsForSubmission, fetchSubmissionDetails } from '../../../services/adminService';
import { useParams } from 'react-router-dom';
const formFields = [
    { label: "Evaluator no. 1", name: "evaluator1", type: "select", placeholder: "Select Evaluator" },
    { label: "Evaluator no. 2", name: "evaluator2", type: "select", placeholder: "Select Evaluator" },
    { label: "Evaluator no. 3", name: "evaluator3", type: "select", placeholder: "Select Evaluator" },
];
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


const AssignEvaluator = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        AssignEvaluatorSchema,
        {
            evaluator1: "",
            evaluator2: "",
            evaluator3: "",
        },
        async (values) => {
            const assignData = {
                evaluatorIDs: [
                    values.evaluator1,
                    values.evaluator2,
                    values.evaluator3,
                ]
            };
            const response = await assignSubmission(submissionID, assignData);
            const successMsg = {
                main: response?.message || "Evaluator assigned successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
        }

    );

    const [dataLoading, setDataLoading] = useState(true);
    const [submission, setSubmission] = useState(true);
    const [evaluators, setEvaluators] = useState([]);
    const { submissionID } = useParams();

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await fetchSubmissionDetails(submissionID);
                if (response?.data) {
                    const data = response.data;
                    setSubmission({
                        submissionID: data.submissionID,
                        teamID: data.teamID.teamID,
                        teamName: data.teamID.teamName,
                        leaderName: data.teamID.leaderName,
                        topic: data.topic,
                        videoURL: data.videoURL,
                        learningOutcomes: data.learningOutcomes,
                        status: data.status,
                        lastUpdated: formattedDate(data.updatedAt),
                        description: data.description,
                    });

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchSubmission();
    }, [submissionID]);

    useEffect(() => {
        const fetchEvaluatorsName = async () => {
            try {
                const response = await fetchEvaluatorsForSubmission();
                if (response?.data) {
                    const data = response.data;
                    setEvaluators(data);

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchEvaluatorsName();
    }, [submissionID]);
    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} title={"Submission Details"} data={submission} />
                <FormRenderer
                    title={"Assign Evaluator"}
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    errors={errors}
                    loading={loading}
                    selectOptions={evaluators}
                />
            </ComponentCard>
        </>
    );
}

export default AssignEvaluator;
