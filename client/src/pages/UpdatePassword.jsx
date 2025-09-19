import FormRenderer from "../components/forms/FormRenderer";
import ComponentCard from "../components/layout/ComponentCard";
import useForm from "../hooks/useForm";
import usePageTitle from "../hooks/usePageTitle";
import { UpdatePasswordSchema } from "../validations/adminSchemas";

const formFields = [
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const UpdatePassword = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdatePasswordSchema,
        {
            password: "MyPassword123!",
            confirmPassword: "MyPassword123!"
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

export default UpdatePassword;
