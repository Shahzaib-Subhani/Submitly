// import React, { useState } from "react";

import Input from "../../components/forms/Input";

import Button from "../../components/forms/Button";
import FormTemplate from "../../components/auth/FormTemplate";
import Footer from "../../components/auth/Footer";
import AuthForm from "../../components/forms/AuthForm";
import usePageTitle from "../../hooks/usePageTitle";
import useForm from "../../hooks/useForm";
import { EvaluatorRegistrationSchema } from "../../validations/authScehma";
import InputPassword from "../../components/forms/InputPassword";
import { registerEvaluator } from "../../services/authService";
import toast from "react-hot-toast";
export default function EvaluatorRegister() {
  const pageTitle = usePageTitle();
  const { formData, errors, handleChange, handleSubmit, loading } = useForm(
    EvaluatorRegistrationSchema,
    {
      name: "",
      email: "",
      qualification: "",
      experience: "",
      password: "",
      confirmPassword: "",
    },
    async (values) => {
      const response = await registerEvaluator(values);
      const successMsg = {
        main: response?.message || "Registration successful",
        sub: false
      };
      toast.success(successMsg);
    }
  );
  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Qualification", name: "qualification", type: "email" },
    { label: "Experience", name: "experience", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];
  return (
    <>
      <FormTemplate
        title={pageTitle}
        description={"Enter your details to create Evaluator account"}

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
            path={"/evaluator-signin"}
            spanText={" Already have an evaluator account?"}
          />
        </AuthForm>
      </FormTemplate>
    </>
  );
}
