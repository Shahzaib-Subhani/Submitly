
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import { EditUserSchema } from '../../validations/adminSchemas';
import useForm from '../../hooks/useForm';
import FormRenderer from '../../components/forms/FormRenderer';

const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const EditUser = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        EditUserSchema,
        {
            teamName: "",
            leaderName: "",
            email: "",
            password: "",
            confirmPassword: "",
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

export default EditUser;
