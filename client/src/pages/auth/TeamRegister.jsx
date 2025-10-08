import toast from "react-hot-toast";
import Footer from "../../components/auth/Footer";
import FormTemplate from "../../components/auth/FormTemplate";
import AuthForm from "../../components/forms/AuthForm";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { registerTeam } from "../../services/authService";
import { TeamRegistrationSchema } from "../../validations/authScehma";

const TeamRegister = () => {
  const pageTitle = usePageTitle();
  const { formData, errors, handleChange, handleSubmit, loading } = useForm(
    TeamRegistrationSchema,
    {
      teamName: "",
      leaderName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    async (values) => {
      const response = await registerTeam(values);
      const successMsg = {
        main: response?.message || "Registration successful",
        sub: false
      };
      toast.success(successMsg);
    }
  );

  const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },

  ];
  return (
    <>
      <FormTemplate
        title={pageTitle}
        description={"Enter your details to create team account"}
      // toastMessage={"Registration Successful"}
      >
        <AuthForm>
          {formFields.map(({ label, name, type }) => (
            type === "password"
              ? <InputPassword
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                error={errors[name]}
              />
              : <Input
                key={name}
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                error={errors[name]}
              />

          ))}

          <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} isLoading={loading} loadingMessage="Registration in progress">
            Submit
          </Button>

          <Footer
            linkTitle={"Login"}
            path={"/team-signin"}
            spanText={" Already have an account?"}
          />
        </AuthForm>
      </FormTemplate>
    </>
  );
};

export default TeamRegister;
