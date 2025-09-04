import FormRenderer from "../../components/forms/FormRenderer";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { EditEvaluatorSchema } from "../../validations/adminSchemas";

const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Qualification", name: "qualification", type: "email" },
    { label: "Experience", name: "experience", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const EvaluatorProfile = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        EditEvaluatorSchema,
        {
            name: "Sophie Turner",
            email: "sophie.turner@example.com",
            qualification: "MSc Computer Science",
            experience: "5 years",
            password: "SecurePass123!",
            confirmPassword: "SecurePass123!"
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
            />
        </ComponentCard>
    );
}

export default EvaluatorProfile;
