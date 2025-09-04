
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import ComponentCard from '../../components/layout/ComponentCard';
import FormRenderer from '../../components/forms/FormRenderer';
import { UpdateProfileSchema } from '../../validations/adminSchemas';

const formFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const Profile = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdateProfileSchema,
        {
            email: "john.doe@example.com",
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
export default Profile;
