
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import useForm from '../../../hooks/useForm';
import { EditMemberSchema } from '../../../validations/adminSchemas';
import FormRenderer from '../../../components/forms/FormRenderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createTeamMember } from '../../../services/adminService';

const formFields = [
    { label: "Member Name", name: "name", type: "text" },
    { label: "Member Email", name: "email", type: "email" },
    { label: "Role", name: "role", type: "email" },
];
const AddTeamMember = () => {
    const pageTitle = usePageTitle();
    const { teamID } = useParams();


    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        EditMemberSchema,
        {
            name: "",
            email: "",
            role: "",
        },
        async (values) => {
            const response = await createTeamMember(teamID, values);
            const successMsg = {
                main: response?.message || "Member created successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
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

export default AddTeamMember;
