
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
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        EditEvaluatorSchema,
        {
            name: "",
            email: "",
            qualification: "",
            experience: "",
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

export default EditEvaluator;
