
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import Button from "../../components/forms/Button";
import FormTemplate from "../../components/auth/FormTemplate";
import Footer from "../../components/auth/Footer";
import AuthForm from "../../components/forms/AuthForm";
import usePageTitle from "../../hooks/usePageTitle";
import useForm from "../../hooks/useForm";
import { LoginSchema } from "../../validations/authScehma";
import { handleLoginSuccess, loginEvaluator } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EvaluatorSignIn() {
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
      const response = await loginEvaluator(values);
      handleLoginSuccess(response, navigate, "/evaluator", "evaluator", setUser);
    }
  );
  return (
    <>
      <FormTemplate
        title={pageTitle}
        description={"Enter your details to sign in as Evaluator"}
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
          <Footer
            linkTitle={"Register"}
            path={"/evaluator-register"}
            spanText={"Don't have an evaluator account?"}
          />
        </AuthForm>
      </FormTemplate>
    </>
  );
}
