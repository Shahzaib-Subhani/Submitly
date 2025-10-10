
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import InputPassword from '../../components/forms/InputPassword';
import { useState } from 'react';
import { EditEvaluatorSchema } from '../../validations/adminSchemas';
import useForm from '../../hooks/useForm';
import FormRenderer from '../../components/forms/FormRenderer';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/layout/Spinner';
import { fetchEvaluatorDetails, updateEvaluatorDetails } from '../../services/adminService';


const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Qualification", name: "qualification", type: "email" },
    { label: "Experience", name: "experience", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const EditEvaluator = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const { evaluatorID } = useParams();
    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        EditEvaluatorSchema,
        {
            name: "",
            email: "",
            qualification: "",
            experience: "",
            password: "",
            confirmPassword: "",
        },
        async (values) => {
            const response = await updateEvaluatorDetails(evaluatorID, values);
            const successMsg = {
                main: response?.message || "Evaluator updated successfully",
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
        const fetchEvaluator = async () => {
            try {
                const response = await fetchEvaluatorDetails(evaluatorID);
                if (response?.data) {
                    const data = response.data;
                    setFormData({
                        name: data.name,
                        email: data.email,
                        qualification: data.qualification,
                        experience: data.experience,
                    });
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchEvaluator();
    }, [evaluatorID, setFormData]);

    
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

export default EditEvaluator;
