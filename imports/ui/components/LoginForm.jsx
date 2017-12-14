// @flow
import React from "react";
import { Field, reduxForm } from "redux-form";
import classNames from "classnames";

const requiredUsername = value => (value ? undefined : `Username / Email is a required field.`);
const requiredPassword = value => (value ? undefined : `Password is a required field.`);

const renderInputError = (inputId: string, error: string) => (
  <div id={`${inputId}Error`} className="dark-red">
    {error}
  </div>
);

type IRenderInputProps = {
  inputId: string,
  autoFocus: boolean,
  label: string,
  type: string,
  input: {},          // redux-form flow type
  meta: {             // redux-form flow type
    touched: boolean, // eslint-disable-line react/no-unused-prop-types
    error: string,    // eslint-disable-line react/no-unused-prop-types
  },
};

const renderInput = (
  { input, inputId, autoFocus, label, type, meta: { touched, error } }: IRenderInputProps,
) => (
  /* eslint-disable jsx-a11y/no-autofocus */
  <div>
    <label
      className={classNames({ "dark-red": touched && !!error })}
      htmlFor={inputId}
    >
      {label}
    </label>
    <input
      {...input}
      id={inputId}
      className={classNames({ "dark-red": touched && !!error })}
      type={type}
      autoFocus={autoFocus}
    />
    {touched && (error && renderInputError(inputId, error))}
  </div>
  /* eslint-enable jsx-a11y/no-autofocus */
);

export type ILoginFormValues = {
  usernameEmail: string,
  loginPassword: string,
};

type ILoginFormProps = {
  handleSubmit: (ILoginFormValues) => void,
  invalid: boolean,
};

// NOTE: when we call the LoginForm component, we pass our submit handler as an
// onSubmit prop, and redux-form passes a submit function in as handleSubmit
const LoginFormComponent = ({ handleSubmit, invalid }: ILoginFormProps) => (
  <form onSubmit={handleSubmit}>
    <Field
      inputId="usernameEmail"
      name="usernameEmail"
      type="text"
      label="Username / Email"
      component={renderInput}
      validate={requiredUsername}
      autoFocus
    />
    <Field
      inputId="loginPassword"
      name="loginPassword"
      type="password"
      label="Password"
      component={renderInput}
      validate={requiredPassword}
    />
    <input
      type="submit"
      value="Login"
      disabled={invalid}
    />
  </form>
);

const onSubmitSuccess = (result, dispatch, props) => {
  // on successful submit, clear the password fields
  props.change("loginPassword", "");
  props.untouch("loginPassword");     // prevents showing validation error

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
