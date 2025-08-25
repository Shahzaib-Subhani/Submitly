import Form from "../components/forms/form";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import FormTemplate from "../components/auth/FormTemplate";
import Footer from "../components/auth/Footer";

export default function EvaluatorSignIn() {
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as Evaluator"}
      >
        <Form>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <Button type={"button"} className={"mt-8"}>
            Log In
          </Button>
          <Footer
            linkTitle={"Register"}
            path={"/evaluator-register"}
            spanText={"Don't have an evaluator account?"}
          />
        </Form>
      </FormTemplate>
    </>
  );
}
