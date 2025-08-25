import Footer from "../components/auth/Footer";
import FormTemplate from "../components/auth/FormTemplate";
import Button from "../components/forms/Button";
import Form from "../components/forms/form";
import Input from "../components/forms/Input";

const TeamLogin = () => {
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as team"}
      >
        <Form>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <Button type={"button"} className={"mt-8"}>
            Log In
          </Button>
          <Footer
            linkTitle={"Register"}
            path={"/team-register"}
            spanText={"Don't have an account?"}
          />
        </Form>
      </FormTemplate>
    </>
  );
};

export default TeamLogin;
