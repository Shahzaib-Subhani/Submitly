
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import ComponentCard from '../../components/layout/ComponentCard';
import FormRenderer from '../../components/forms/FormRenderer';
import { UpdateProfileSchema } from '../../validations/adminSchemas';
import LinkButton from '../../components/forms/LinkButton';

const formFields = [
    { label: "Email", name: "email", type: "email" }
];
const linkButton = {
    variant: "light",
    color: "light",
    title: "Update Password",
    path: "/admin/update-password"
}
const Profile = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdateProfileSchema,
        {
            email: "john.doe@example.com"
        }
    );

    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                linkButton={linkButton}
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
