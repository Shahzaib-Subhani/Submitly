
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import { useState } from 'react';
import InputPassword from '../../components/forms/InputPassword';
import { EditUserSchema } from '../../validations/schemas';



const EditUser = () => {
    const pageTitle = usePageTitle();
    const [formData, setFormData] = useState({
        "teamName": "",
        "leaderName": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); 
    };

    const handleSubmit = () => {
        const result = EditUserSchema.safeParse(formData);

        if (!result.success) {

            const fieldErrors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
        } else {
            console.log("Form submitted:", result.data);
            setErrors({});
        }
    };

    const textFields = [
        { label: "Team Name", name: "teamName", type: "text" },
        { label: "Leader Name", name: "leaderName", type: "text" },
        { label: "Email", name: "email", type: "email" },
    ];

    const passwordFields = [
        { label: "Password", name: "password" },
        { label: "Confirm Password", name: "confirmPassword" },
    ];
    return (
        <ComponentCard title={pageTitle}>
            <Form >
                <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>


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
                    <div className='flex justify-center '>

                        <div className='ms-4 md:w-50 w-full'>
                            <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </ComponentCard>
    );
}

export default EditUser;
