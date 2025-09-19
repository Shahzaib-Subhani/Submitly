import FormRenderer from "../../components/forms/FormRenderer";
import LinkButton from "../../components/forms/LinkButton";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { UpdateEvaluatorProfileSchema } from "../../validations/adminSchemas";

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
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdateEvaluatorProfileSchema,
        {
            name: "Sophie Turner",
            email: "sophie.turner@example.com",
            qualification: "MSc Computer Science",
            experience: "5 years"
        }
    );

    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                formFields={formFields}
                linkButton={linkButton}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
                loading={loading}
            />
        </ComponentCard>
    );
}

export default EvaluatorProfile;
