import React, { useEffect, useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import FormRenderer from '../../components/forms/FormRenderer';
import useForm from '../../hooks/useForm';
import { ContentSubmissionSchema } from '../../validations/adminSchemas';
import { fetchSubmissionDetails, updateSubmission } from '../../services/teamService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
const formFields = [
    { label: "Topic", name: "topic", type: "text" },
    { label: "Video Link", name: "videoURL", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Learning Outcomes", name: "learningOutcomes", type: "textarea" }
];

const EditSubmission = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [submissionID, setSubmissionID] = useState(null);
    const { formData, errors, handleChange, handleSubmit, loading, setFormData, setLoading } = useForm(
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
            const response = await updateSubmission(submissionID, submissionData);
            const successMsg = {
                main: response?.message || "Submission updated successful",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...submissionData,
            }));
        }
    );

    // Fetch existing submission data
    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await fetchSubmissionDetails(user?._id);
                if (response?.data) {
                    // populate form with fetched data
                    setSubmissionID(response.data._id);
                    setFormData({
                        topic: response.data.topic || "",
                        videoURL: response.data.videoURL || "",
                        description: response.data.description || "",
                        learningOutcomes: response.data.learningOutcomes || "",
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error({ main: "Failed to fetch submission data" });
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [user._id, setFormData]);

    if (loading) return <div>Loading submission...</div>;

    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                formFields={formFields}
                handleChange={handleChange}
                handleSubmit={() => handleSubmit(false)}
                formData={formData}
                errors={errors}
                loading={loading}
                col={2}
            />
        </ComponentCard>
    );
}
export default EditSubmission;
