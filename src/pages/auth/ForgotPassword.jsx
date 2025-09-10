import React from 'react';
import FormTemplate from '../../components/auth/FormTemplate';
import AuthForm from '../../components/forms/AuthForm';
import Input from '../../components/forms/Input';
import InputPassword from '../../components/forms/InputPassword';
import Button from '../../components/forms/Button';
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import { ForgotPasswordSchema } from '../../validations/authScehma';

const ForgotPassword = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        ForgotPasswordSchema,
        {
            email: "",
            password: "",
        }
    );
    return (
        <>
            <FormTemplate
                title={"Forgot Password"}
                description={"Enter your email to get OTP"}
                toastMessage={"OTP sent Successful"}
            >
                <AuthForm>
                    <Input
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}

                    />

                    <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} loadingMessage="logging in" isLoading={loading}>
                        Log In
                    </Button>

                </AuthForm>
            </FormTemplate>
        </>
    );
};

export default ForgotPassword;
