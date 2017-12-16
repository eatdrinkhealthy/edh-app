// @flow
import React from "react";
import { Field, reduxForm } from "redux-form";
import { validateUserField } from "../../api/accounts/userSchema";
import FormInput from "./FormInput";
import { Button } from "./ReactBootstrapLib";

const validateUsername = value => validateUserField("username", value);

const validateEmail = value => validateUserField("email", value);

const validatePassword = value => validateUserField("password", value);

const validateConfirmPassword = (value, allValues) => (
  allValues.password !== allValues.confirmPassword
    ? "Password and Confirm Password fields do not match."
    : undefined
);

export type ICreateAccountFormValues = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

type ICreateAccountFormProps = {
  handleSubmit: (values: ICreateAccountFormValues) => void,
  invalid: boolean,
};

// NOTE: when we call the CreateAccountForm component, we pass our submit handler as an
// onSubmit prop, and redux-form passes a submit function in as handleSubmit
const CreateAccountFormComponent = ({ handleSubmit, invalid }: ICreateAccountFormProps) => (
  <form className="measure center" onSubmit={handleSubmit}>
    <Field
      inputId="username"
      name="username"
      type="text"
      label="Username"
      component={FormInput}
      validate={validateUsername}
      autoFocus
    />
    <Field
      inputId="email"
      name="email"
      type="email"
      label="Email"
      component={FormInput}
      validate={validateEmail}
    />
    <Field
      inputId="password"
      name="password"
      type="password"
      label="Password"
      component={FormInput}
      validate={validatePassword}
    />
    <Field
      inputId="confirmPassword"
      name="confirmPassword"
      type="password"
      label="Confirm Password"
      component={FormInput}
      validate={validateConfirmPassword}
    />
    <Button id="createAccountSubmit" type="submit" disabled={invalid}>Create Account</Button>
  </form>
);

const onSubmitSuccess = (result, dispatch, props) => {
  // on successful submit, clear password fields
  props.change("password", "");
  props.untouch("password");          // prevents showing validation error
  props.change("confirmPassword", "");

  // set focus on username field
  // NOTE: using document.querySelector is not a React standard (works here, not in jest)
  const usernameElem = document.querySelector("input#username");
  if (usernameElem) {
    usernameElem.focus();
  }
};

const CreateAccountForm = reduxForm({
  form: "CreateAccountForm",
  onSubmitSuccess,
})(CreateAccountFormComponent);

export default CreateAccountForm;
