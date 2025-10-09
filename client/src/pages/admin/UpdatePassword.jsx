import toast from "react-hot-toast";
import usePageTitle from "../../hooks/usePageTitle";
import { useAuth } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { updateEvaluatorPassword } from "../../services/evaluatorService";
import ComponentCard from "../../components/layout/ComponentCard";
import FormRenderer from "../../components/forms/FormRenderer";
import { UpdatePasswordSchema } from "../../validations/adminSchemas";
import { updateAdminPassword } from "../../services/adminService";


const formFields = [
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
];

const UpdatePassword = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdatePasswordSchema,
        {
            password: "",
            confirmPassword: ""
        },
        async (values) => {
            const response = await updateAdminPassword(user?.id, values);
            const successMsg = {
                main: response?.message || "Password updated successfully",
                sub: false
            };
            toast.success(successMsg);
          
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

export default UpdatePassword;
