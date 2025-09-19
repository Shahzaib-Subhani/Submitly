
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import FormTemplate from '../../components/auth/FormTemplate';
import InputPassword from '../../components/forms/InputPassword';
import Input from '../../components/forms/Input';
import AuthForm from '../../components/forms/AuthForm';
import Button from '../../components/forms/Button';
import { UpdatePasswordSchema } from '../../validations/adminSchemas';

const ResetPassword = () => {
  const pageTitle = usePageTitle();
  const { formData, errors, handleChange, handleSubmit, loading } = useForm(
    UpdatePasswordSchema,
    {
      password: "",
      confirmPassword: "",
    }
  );

  const formFields = [
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },

  ];
  return (
    <>
      <FormTemplate
        title={pageTitle}
        description={"Reset Your Password"}
        toastMessage={"Password changed Successful"}
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

        </AuthForm>
      </FormTemplate>
    </>
  );
};

export default ResetPassword;
