import Footer from "../components/auth/Footer";
import FormTemplate from "../components/auth/FormTemplate";
import AuthForm from "../components/forms/AuthForm";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

const TeamLogin = () => {
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as team"}
      >
        <AuthForm>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <Button type={"button"} className={"mt-8 w-full"}>
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
