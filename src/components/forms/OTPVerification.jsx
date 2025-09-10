import usePageTitle from "../../hooks/usePageTitle";
import FormTemplate from "../auth/FormTemplate";
import AuthForm from "./AuthForm";
import useForm from "../../hooks/useForm";
import { OTPVerificationSchema } from "../../validations/adminSchemas";
import Button from "./Button";
import OTPInput from "./OTPInput";
import { ota } from "zod/locales";

const OTPVerification = () => {
    const pageTitle = usePageTitle();

    const { formData, errors, handleSubmit, loading, setErrors, setFormData } = useForm(
        OTPVerificationSchema,
        {
            otp: "",
        }
    );

    return (
        <FormTemplate
            title={"OTP Verification"}
            description={"Enter the 6-digit OTP sent to your email"}
            toastMessage={"OTP Verified Successfully"}
        >
            <AuthForm>
                <OTPInput
                    value={formData.otp}
                    onChange={(val) => {
                        setFormData({ ...formData, otp: val })
                        setErrors((prev) => ({ ...prev, otp: "" }))
                    }}
                    error={errors.otp}
                />
                <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} loadingMessage="logging in" isLoading={loading}>
                    Log In
                </Button>
            </AuthForm>
        </FormTemplate>
    );
};


export default OTPVerification;
