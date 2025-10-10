
import usePageTitle from '../../../hooks/usePageTitle';
import ComponentCard from '../../../components/layout/ComponentCard';
import { EditUserSchema } from '../../../validations/adminSchemas';
import useForm from '../../../hooks/useForm';
import FormRenderer from '../../../components/forms/FormRenderer';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/layout/Spinner';
import { useParams } from 'react-router-dom';
import { fetchTeamDetails, updateTeamDetails } from '../../../services/adminService';
import toast from 'react-hot-toast';

const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const EditTeam = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const { teamID } = useParams();

    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        EditUserSchema,
        {
            teamName: "",
            leaderName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        async (values) => {
            const response = await updateTeamDetails(teamID, values);
            const successMsg = {
                main: response?.message || "Team updated successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
                password: "",
                confirmPassword: "",
            }));
        }
    );
    // Fetch team data
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetchTeamDetails(teamID);
                if (response?.data) {
                    const data = response.data;
                    setFormData({
                        teamName: data.teamName,
                        leaderName: data.leaderName,
                        email: data.email,
                    });
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchTeam();
    }, [teamID, setFormData]);
    if (dataLoading) return <Spinner />;
    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
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

export default EditTeam;
