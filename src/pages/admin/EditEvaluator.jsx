
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import InputPassword from '../../components/forms/InputPassword';
import { useState } from 'react';
import { EditEvaluatorSchema } from '../../validations/adminSchemas';
import useForm from '../../hooks/useForm';

const EditEvaluator = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit } = useForm(
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
    
    const textFields = [
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Qualification", name: "qualification", type: "email" },
        { label: "Experience", name: "experience", type: "email" },
    ];

    const passwordFields = [
        { label: "Password", name: "password" },
        { label: "Confirm Password", name: "confirmPassword" },
    ];
    return (
        <ComponentCard title={pageTitle}>
            <Form title={"User Details : "}>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    {textFields.map(({ label, name, type }) => (
                        <Input
                            key={name}
                            label={label}
                            name={name}
                            type={type}
                            value={formData[name]}
                            onChange={handleChange}
                            error={errors[name]}
                        />
                    ))}

                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    {passwordFields.map(({ label, name }) => (
                        <InputPassword
                            key={name}
                            label={label}
                            name={name}
                            type="password"
                            value={formData[name]}
                            onChange={handleChange}
                            error={errors[name]}
                        />
                    ))}
                </div>
                <div className='flex justify-end'>

                    <div className='ms-4'>
                        <Button type={"button"} className={"mt-8"} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </ComponentCard>
    );
}

export default EditEvaluator;
