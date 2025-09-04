import Footer from "../components/auth/Footer";
import FormTemplate from "../components/auth/FormTemplate";
import AuthForm from "../components/forms/AuthForm";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";
import InputPassword from "../components/forms/InputPassword";
import useForm from "../hooks/useForm";
import usePageTitle from "../hooks/usePageTitle";
import { LoginSchema } from "../validations/authScehma";

const TeamLogin = () => {
  const pageTitle = usePageTitle();
  const { formData, errors, handleChange, handleSubmit, loading } = useForm(
    LoginSchema,
    {
      email: "",
      password: "",
    }
  );
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as team"}
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
            path={"/team-register"}
            spanText={"Don't have an account?"}
          />
        </AuthForm>
      </FormTemplate>
    </>
  );
};

export default TeamLogin;
