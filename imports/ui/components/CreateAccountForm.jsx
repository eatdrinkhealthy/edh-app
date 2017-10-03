// @flow
import React from "react";
import { Field, reduxForm } from "redux-form";
import classNames from "classnames";

const validate = (values) => {
  const errors = {};

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password and Confirm Password fields do not match.";
  }

  return errors;
};

const renderInputError = (inputId: string, error: string) => (
  <div id={`${inputId}Error`} className="ml2 mt1 dark-red">
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
    error: string,    // eslint-disable-line react/no-unused-prop-types
  },
};

const renderInput = (
  { input, inputId, autoFocus, label, type, meta: { error } }: IRenderInputProps,
) => (
  /* eslint-disable jsx-a11y/no-autofocus */
  <div>
    <label
      className={classNames("db fw6 lh-copy f6", { "dark-red": !!error })}
      htmlFor={inputId}
    >
      {label}
    </label>
    <input
      {...input}
      id={inputId}
      className={classNames(
        "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",
        { "dark-red": !!error },
      )}
      placeholder={label}
      type={type}
      autoFocus={autoFocus}
    />
    {error && renderInputError(inputId, error)}
  </div>
  /* eslint-enable jsx-a11y/no-autofocus */
);

export type ICreateAccountFormValues = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

type ICreateAccountFormProps = {
  handleSubmit: (values: ICreateAccountFormValues) => void,
};

// NOTE: when we call the CreateAccountForm component, we pass our submit handler as an
// onSubmit prop, and redux-form passes a submit function in as handleSubmit
const CreateAccountForm = (props: ICreateAccountFormProps) => {
  const { handleSubmit } = props;

  return (
    <div className="pt2 pl4 pr4 pb4">
      <form className="measure center" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create Account</legend>
          <div className="mt3">
            <Field
              inputId="username"
              name="username"
              type="text"
              label="Username"
              component={renderInput}
              autoFocus
            />
          </div>
          <div className="mt3">
            <Field
              inputId="email"
              name="email"
              type="email"
              label="Email"
              component={renderInput}
            />
          </div>
          <div className="mv3">
            <Field
              inputId="password"
              name="password"
              type="password"
              label="Password"
              component={renderInput}
            />
          </div>
          <div className="mv3">
            <Field
              inputId="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              component={renderInput}
            />
          </div>
        </fieldset>
        <div>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Create Account"
          />
        </div>
      </form>
    </div>
  );
};

const onSubmitSuccess = (result, dispatch, props) => {
  // on successful submit, clear password fields
  props.change("password", "");
  props.change("confirmPassword", "");

  // set focus on username field
  const usernameElem = document.querySelector("#username");
  if (usernameElem) {
    usernameElem.focus();
  }
};

export default reduxForm({
  form: "CreateAccountForm",
  onSubmitSuccess,
  validate,
})(CreateAccountForm);