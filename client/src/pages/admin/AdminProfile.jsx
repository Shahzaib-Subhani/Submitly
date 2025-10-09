
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import ComponentCard from '../../components/layout/ComponentCard';
import FormRenderer from '../../components/forms/FormRenderer';
import { UpdateProfileSchema } from '../../validations/adminSchemas';
import LinkButton from '../../components/forms/LinkButton';
import { useEffect, useState } from 'react';
import { fetchAdminProfile, updateAdminProfile } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/layout/Spinner';
import toast from 'react-hot-toast';

const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
];
const linkButton = {
    variant: "light",
    color: "light",
    title: "Update Password",
    path: "/admin/update-password"
}
const Profile = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        UpdateProfileSchema,
        {
            name: "",
            email: ""
        },
        async (values) => {
            const response = await updateAdminProfile(user?.id, values);
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
        const fetchAdmin = async () => {
            try {
                const response = await fetchAdminProfile(user?.id);
                if (response?.data) {
                    const data = response.data;
                    setFormData({
                        name: data.name,
                        email: data.email,
                    });
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchAdmin();
    }, [user.id, setFormData]);
    if (dataLoading) return <Spinner />;
    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                linkButton={linkButton}
                formFields={formFields}
                handleChange={handleChange}
                handleSubmit={() => handleSubmit(false)}
                formData={formData}
                errors={errors}
                loading={loading}
            />
        </ComponentCard>
    );
}
export default Profile;
