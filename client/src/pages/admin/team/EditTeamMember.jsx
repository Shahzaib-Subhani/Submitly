
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import useForm from '../../../hooks/useForm';
import { EditMemberSchema } from '../../../validations/adminSchemas';
import FormRenderer from '../../../components/forms/FormRenderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamDetails, updateTeamMember } from '../../../services/adminService';
import toast from 'react-hot-toast';
import Spinner from '../../../components/layout/Spinner';

const formFields = [
    { label: "Member Name", name: "name", type: "text" },
    { label: "Member Email", name: "email", type: "email" },
    { label: "Role", name: "role", type: "email" },
];
const EditTeamMember = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const [team, setTeam] = useState(true);
    const { teamID, memberID } = useParams();


    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        EditMemberSchema,
        {
            name: "",
            email: "",
            role: "",
        },
        async (values) => {
            const response = await updateTeamMember(teamID, memberID, values);
            const successMsg = {
                main: response?.message || "Member updated successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
        }
    );
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetchTeamDetails(teamID);
                if (response?.data) {
                    const data = response.data;
                    const member = data.members.find((member) => member._id === memberID);

                    if (!member) {
                        toast.error({ main: "Member not found" });

                    } else {
                        setFormData({
                            name: member.name,
                            email: member.email,
                            role: member.role,
                        });
                    }

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchTeam();
    }, [teamID, memberID]);
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

export default EditTeamMember;
