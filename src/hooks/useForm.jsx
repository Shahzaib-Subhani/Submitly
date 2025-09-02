import React, { useState } from 'react';

const useForm = (schema, initialValues) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = () => {
        setLoading(true);
        const result = schema.safeParse(formData);

        if (!result.success) {

            const fieldErrors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setLoading(false);
            setErrors(fieldErrors);
        } else {
            setTimeout(() => {
                console.log("Form submitted:", result.data);
                setErrors({});
                setLoading(false);
            }, 1500);
        }
    };
    return { formData, setFormData, errors, handleChange, handleSubmit, loading }
}

export default useForm;
