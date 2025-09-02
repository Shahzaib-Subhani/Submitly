import React, { useState } from 'react';

const useForm = (schema, initialValues) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = () => {
        const result = schema.safeParse(formData);

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
    return { formData, setFormData, errors, handleChange, handleSubmit }
}

export default useForm;
