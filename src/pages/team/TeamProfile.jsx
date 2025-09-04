import FormRenderer from "../../components/forms/FormRenderer";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { EditUserSchema } from "../../validations/adminSchemas";


const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const TeamProfile = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        EditUserSchema,
        {
            teamName: "Black Panthers",
            leaderName: "Alex Johnson",
            email: "alex.johnson@example.com",
            password: "Password123!",
            confirmPassword: "Password123!"
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
export default TeamProfile;
