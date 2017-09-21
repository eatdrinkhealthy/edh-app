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

const renderInputError = (error: string) => (
  <div className="ml2 mt1 dark-red">
    {error}
  </div>
);

const renderInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label
      className={classNames("db fw6 lh-copy f6", { "dark-red": !!error })}
    >
      {label}
    </label>
    <input
      {...input}
      className={classNames(
        "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",
        { "dark-red": error },
      )}
      placeholder={label}
      type={type}
    />
    {touched && (error && renderInputError(error))}
  </div>
);

// propTypes?
// handleSubmit: (username: string, email: string, password: string) => void,

const CreateAccount = (props) => {
  const { handleSubmit } = props;

  return (
    <div className="pt2 pl4 pr4 pb4">
      <form className="measure center" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create Account</legend>
          <div className="mt3">
            <Field name="username" type="text" label="Username" component={renderInput} />
          </div>
          <div className="mt3">
            <Field name="email" type="email" label="Email" component={renderInput} />
          </div>
          <div className="mv3">
            <Field name="password" type="password" label="Password" component={renderInput} />
          </div>
          <div className="mv3">
            <Field
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

export default reduxForm({
  form: "CreateAccount",
  validate,
})(CreateAccount);
