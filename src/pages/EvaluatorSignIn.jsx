
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import FormTemplate from "../components/auth/FormTemplate";
import Footer from "../components/auth/Footer";
import AuthForm from "../components/forms/AuthForm";

export default function EvaluatorSignIn() {
  return (
    <>
      <FormTemplate
        title={"Sign In"}
        description={"Enter your details to sign in as Evaluator"}
      >
        <AuthForm>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <Button type={"button"} className={"mt-8 w-full"}>
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
