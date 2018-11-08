// @flow
import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Panel } from "./ReactBootstrapLib";
import FormInput from "./FormInput";

const requiredUsername = value =>
  value ? undefined : `Username / Email is a required field.`;
const requiredPassword = value => (value ? undefined : `Password is a required field.`);

export type ILoginFormValues = {
  usernameEmail: string,
  loginPassword: string,
};

type ILoginFormProps = {
  handleSubmit: ILoginFormValues => void,
  invalid: boolean,
};

// NOTE: when we call the LoginForm component, we pass our submit handler as an
// onSubmit prop, and redux-form passes a submit function in as handleSubmit
const LoginFormComponent = ({ handleSubmit, invalid }: ILoginFormProps) => (
  <Panel header="Get Started">
    <form onSubmit={handleSubmit}>
      <Field
        inputId="usernameEmail"
        name="usernameEmail"
        type="text"
        label="Username / Email"
        component={FormInput}
        validate={requiredUsername}
        autoFocus
      />
      <Field
        inputId="loginPassword"
        name="loginPassword"
        type="password"
        label="Password"
        component={FormInput}
        validate={requiredPassword}
      />
      <Button id="loginSubmit" type="submit" disabled={invalid}>
        Sign In
      </Button>
    </form>
  </Panel>
);

const onSubmitSuccess = (result, dispatch, props) => {
  // on successful submit, clear the password fields
  props.change("loginPassword", "");
  props.untouch("loginPassword"); // prevents showing validation error

  // set focus on usernameEmail field
  // NOTE: using document.querySelector is not a React standard (works here, not in jest)
  const usernameEmailElem = document.querySelector("input#usernameEmail");
  if (usernameEmailElem) {
    usernameEmailElem.focus();
  }
};

const LoginForm = reduxForm({
  form: "LoginForm",
  onSubmitSuccess,
})(LoginFormComponent);

export default LoginForm;
