import React, { useState } from 'react';
import toast from 'react-hot-toast';

const useForm = (schema, initialValues, onSubmit) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async () => {
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
        }
        else {
            try {
                if (onSubmit) {
                    const response = await onSubmit(formData);
                    console.log(response);
                    toast.dismiss();
                    setFormData(initialValues);
                    setErrors({});

                    return response;
                }
            } catch (error) {
                console.log(error);
                const subMessage = typeof error?.error === "string"
                    ? error.error
                    : Array.isArray(error?.error) && error.error.length > 0
                        ? Object.values(error?.error[0])
                        : false;
                const errorMsg = {
                    main: error?.message || "Submission Error.",
                    sub: subMessage
                };
                toast.dismiss();
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        }
    };
    return { formData, setFormData, errors, handleChange, handleSubmit, loading, setErrors }
}

export default useForm;
