import Footer from "../components/auth/Footer";
import FormTemplate from "../components/auth/FormTemplate";
import Button from "../components/forms/Button";
import Form from "../components/forms/form";
import Input from "../components/forms/Input";

const TeamRegister = () => {
  return (
    <>
      <FormTemplate
        title={"Account Registration"}
        description={"Enter your details to create team account"}
      >
        <Form>
          <Input label="Team Name" name="teamName" type="text" />
          <Input label="Leader Name" name="leaderName" type="text" />
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />

          <Button type={"button"} className={"mt-8"}>
            Submit
          </Button>

          <Footer
            linkTitle={"Login"}
            path={"/team-login"}
            spanText={" Already have an account?"}
          />
        </Form>
      </FormTemplate>
    </>
  );
};

export default TeamRegister;
