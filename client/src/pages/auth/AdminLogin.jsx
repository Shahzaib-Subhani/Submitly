import { useNavigate } from "react-router-dom";
import Footer from "../../components/auth/Footer";
import FormTemplate from "../../components/auth/FormTemplate";
import AuthForm from "../../components/forms/AuthForm";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { handleLoginSuccess, loginAdmin } from "../../services/authService";
import { LoginSchema } from "../../validations/authScehma";
import { useAuth } from "../../context/AuthContext";

const TeamLogin = () => {
  const pageTitle = usePageTitle();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { formData, errors, handleChange, handleSubmit, loading } = useForm(
    LoginSchema,
    {
      email: "",
      password: "",
    },
    async (values) => {
      const response = await loginAdmin(values);
      handleLoginSuccess(response, navigate, "/admin", "admin", setUser);
    }
  );
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as Admin"}
        toastMessage={"Sign In Successful"}
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
          <InputPassword
            label={"Password"}
            name={"password"}

            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} loadingMessage="logging in" isLoading={loading}>
            Log In
          </Button>

        </AuthForm>
      </FormTemplate>
    </>
  );
};

export default TeamLogin;
