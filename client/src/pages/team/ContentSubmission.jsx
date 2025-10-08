import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import { useFormAction } from 'react-router-dom';
import ComponentCard from '../../components/layout/ComponentCard';
import { ContentSubmissionSchema } from '../../validations/adminSchemas';
import FormRenderer from '../../components/forms/FormRenderer';
import useForm from '../../hooks/useForm';
import { contentSubmission } from '../../services/teamService';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';


const formFields = [
    { label: "Topic", name: "topic", type: "text" },
    { label: "Video Link", name: "videoURL", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Learning Outcomes", name: "learningOutcomes", type: "textarea" }
];

const ContentSubmission = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        ContentSubmissionSchema,
        {
            topic: "",
            videoURL: "",
            description: "",
            learningOutcomes: "",
        },
        async (values) => {
            const submissionData = {
                ...values,
                teamID: user?._id,
            }
            const response = await contentSubmission(submissionData);
            const successMsg = {
                main: response?.message || "Content Submission successful",
                sub: false
            };
            toast.success(successMsg);
        }
    );

    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                formFields={formFields}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
                loading={loading}
                col={2}
            />
        </ComponentCard>
    );
}


export default ContentSubmission;
