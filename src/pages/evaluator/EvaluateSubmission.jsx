import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import ComponentCard from '../../components/layout/ComponentCard';
import DetailsCard from '../../components/dashboard/DetailsCard';
import FormRenderer from '../../components/forms/FormRenderer';
import { AssignEvaluatorSchema, EvaluateSubmissionSchema } from '../../validations/adminSchemas';
import EvaluationForm from '../../components/dashboard/EvaluationForm';
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
const formFields = [
    { srNo: 1, label: "Relevance to Learning Objectives/Outcomes", name: "relevanceToObjectives", type: "number", max: 5 },
    { srNo: 2, label: "Innovation & Creativity", name: "innovationCreativity", type: "number", max: 15 },
    { srNo: 3, label: "Clarity and Accessibility", name: "clarityAccessibility", type: "number", max: 10 },
    { srNo: 4, label: "Depth", name: "depth", type: "number", max: 5 },
    { srNo: 5, label: "Interactivity and Engagement", name: "interactivityEngagement", type: "number", max: 25 },
    { srNo: 6, label: "Use of Technology", name: "useOfTechnology", type: "number", max: 5 },
    { srNo: 7, label: "Scalability and Adaptability", name: "scalabilityAdaptability", type: "number", max: 10 },
    { srNo: 8, label: "Alignment with Ethical Standards", name: "ethicalStandards", type: "number", max: 5 },
    { srNo: 9, label: "Practical Application", name: "practicalApplication", type: "number", max: 10 },
    { srNo: 10, label: "Video Quality", name: "videoQuality", type: "number", max: 10 },

];

const EvaluateSubmission = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleSubmit, setFormData, setErrors, loading } = useForm(
        EvaluateSubmissionSchema,
        {
            relevanceToObjectives: 0,
            innovationCreativity: 0,
            clarityAccessibility: 0,
            depth: 0,
            interactivityEngagement: 0,
            useOfTechnology: 0,
            scalabilityAdaptability: 0,
            ethicalStandards: 0,
            practicalApplication: 0,
            videoQuality: 0,
            total: 0
        }
    );

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

    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} title={"Submission Details"} data={submission} />
                <EvaluationForm
                    title={"Evaluate Submission"}
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    errors={errors}
                    loading={loading} />

            </ComponentCard>
        </>
    );
}

export default EvaluateSubmission;
