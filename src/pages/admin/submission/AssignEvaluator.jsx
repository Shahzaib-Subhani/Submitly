import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import ComponentCard from '../../../components/layout/ComponentCard';
import FormRenderer from '../../../components/forms/FormRenderer';
import useForm from '../../../hooks/useForm';
import { AssignEvaluatorSchema } from '../../../validations/adminSchemas';
import DetailsCard from '../../../components/dashboard/DetailsCard';
const formFields = [
    { label: "Evaluator no. 1", name: "evaluator1", type: "text" },
    { label: "Evaluator no. 2", name: "evaluator2", type: "text" },
    { label: "Evaluator no. 3", name: "evaluator3", type: "text" },
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
    isFinal: "Final Submission",
    lastUpdated: "Last Updated"
};

const submission = {
    submissionID: 1,
    teamID: 101,
    teamName: "Team no.1 ",
    leaderName: "Leader no 1",
    topic: "AI in Education",
    videoURL: "https://example.com/video.mp4",
    learningOutcomes: "Improved adaptability, automated grading, personalized content delivery.",
    status: "Submitted",
    isFinal: true,
    lastUpdated: "03-12-2024 10:30 AM",
    description: "A project exploring how AI can improve personalized learning.",
};

const AssignEvaluator = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        AssignEvaluatorSchema,
        {
            evaluator1: "",
            evaluator2: "",
            evaluator3: "",
        }
    );
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={submission} />
                <FormRenderer
                    title={"Choose Evaluator"}
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    errors={errors}
                    loading={loading}
                />
            </ComponentCard>
        </>
    );
}

export default AssignEvaluator;
