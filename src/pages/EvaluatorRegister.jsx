// import React, { useState } from "react";

import Input from "../components/forms/Input";

import Button from "../components/forms/Button";
import FormTemplate from "../components/auth/FormTemplate";
import Footer from "../components/auth/Footer";
import AuthForm from "../components/forms/AuthForm";
export default function EvaluatorRegister() {

  return (
    <>
      <FormTemplate
        title={"Account Registration"}
        description={"Enter your details to create Evaluator account"}
      >
        <AuthForm>
          <Input label="Name" name="name" type="text" />
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
        
          <div className="sm:grid grid-cols-2 gap-3">
            <Input label="Qualification" name="qualification" type="text" />
            <Input label="Experience" name="experience" type="text" />
          </div>

          <Button type={"button"} className={"mt-8 w-full"}>
            Submit
          </Button>

          <Footer
            linkTitle={"Login"}
            path={"/evaluator-login"}
            spanText={" Already have an evaluator account?"}
          />
        </AuthForm>
      </FormTemplate>
    </>
  );
}
