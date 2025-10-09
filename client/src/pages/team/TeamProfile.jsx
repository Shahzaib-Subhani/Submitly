import FormRenderer from "../../components/forms/FormRenderer";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { UpdateTeamProfileSchema } from "../../validations/adminSchemas";
import LinkButton from '../../components/forms/LinkButton';
import { fetchTeamProfile, updateTeamProfile } from "../../services/teamService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "../../components/layout/Spinner";


const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" }
];
const linkButton = {
    variant: "light",
    color: "light",
    title: "Update Password",
    path: "/team/update-password"
}

const TeamProfile = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        UpdateTeamProfileSchema,
        {
            teamName: "",
            leaderName: "",
            email: ""
        },
        async (values) => {
            const response = await updateTeamProfile(user?._id, values);
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
        const fetchTeam = async () => {
            try {
                const response = await fetchTeamProfile(user?._id);
                if (response?.data) {
                    // populate form with fetched data
                    setFormData({
                        teamName: response.data.teamName || "",
                        leaderName: response.data.leaderName || "",
                        email: response.data.email || "",
                    });
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchTeam();
    }, [user._id, setFormData]);

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
export default TeamProfile;
