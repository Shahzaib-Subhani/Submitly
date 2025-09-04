import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import FormRenderer from '../../components/forms/FormRenderer';
import useForm from '../../hooks/useForm';
import { ContentSubmissionSchema } from '../../validations/adminSchemas';
const formFields = [
    { label: "Topic", name: "topic", type: "text" },
    { label: "Video Link", name: "videoURL", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Learning Outcomes", name: "learningOutcomes", type: "textarea" }
];

const EditSubmission = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        ContentSubmissionSchema,
        {
            topic: "",
            videoURL: "",
            description: "",
            learningOutcomes: "",
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
export default EditSubmission;
