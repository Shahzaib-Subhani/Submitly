import { useEffect, useState } from "react";
import FormRenderer from "../../components/forms/FormRenderer";
import LinkButton from "../../components/forms/LinkButton";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { UpdateEvaluatorProfileSchema } from "../../validations/adminSchemas";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { fetchEvaluatorProfile, updateEvaluatorProfile } from "../../services/evaluatorService";
import Spinner from "../../components/layout/Spinner";

const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Qualification", name: "qualification", type: "email" },
    { label: "Experience", name: "experience", type: "email" }
];
const linkButton = {
    variant: "light",
    color: "light",
    title: "Update Password",
    path: "/evaluator/update-password"
}

const EvaluatorProfile = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        UpdateEvaluatorProfileSchema,
        {
            name: "",
            email: "",
            qualification: "",
            experience: ""
        },
        async (values) => {
            const response = await updateEvaluatorProfile(user?.id, values);
            const successMsg = {
                main: response?.message || "Profile updated successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
        }
    );

    // Fetch profile data
    useEffect(() => {
        const fetchEvaluator = async () => {
            try {
                const response = await fetchEvaluatorProfile(user?.id);
                if (response?.data) {
                    const data = response.data;
                    // populate form with fetched data
                    setFormData({
                        name: data.name,
                        email: data.email,
                        qualification: data.qualification,
                        experience: data.experience
                    });
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchEvaluator();
    }, [user._id, setFormData]);
    if (dataLoading) return <Spinner />;
    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                formFields={formFields}
                linkButton={linkButton}
                handleChange={handleChange}
                handleSubmit={() => handleSubmit(false)}
                formData={formData}
                errors={errors}
                loading={loading}
            />
        </ComponentCard>
    );
}

export default EvaluatorProfile;
