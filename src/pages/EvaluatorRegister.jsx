// import React, { useState } from "react";

import Form from "../components/forms/form";
import Input from "../components/forms/Input";

import Button from "../components/forms/Button";
import FormTemplate from "../components/auth/FormTemplate";
import Footer from "../components/auth/Footer";
export default function EvaluatorRegister() {

  return (
    <>
      <FormTemplate
        title={"Account Registration"}
        description={"Enter your details to create Evaluator account"}
      >
        <Form>
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

          <Button type={"button"} className={"mt-8"}>
            Submit
          </Button>

          <Footer
            linkTitle={"Login"}
            path={"/evaluator-login"}
            spanText={" Already have an evaluator account?"}
          />
        </Form>
      </FormTemplate>
    </>
  );
}
