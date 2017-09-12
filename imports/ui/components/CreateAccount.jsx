// @flow
import React, { Component } from "react";
import classNames from "classnames";

// import type { SimpleSchema } from "meteor/aldeed:simple-schema";

class CreateAccount extends Component {
  props: {
    handleSubmit: (username: string, email: string, password: string) => void,
    // formValidator?: SimpleSchema<*>,   // eslint-disable-line react/require-default-props
  };

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    formErrors: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  componentDidMount() {
    this.usernameInput.focus();
  }

  usernameInput: HTMLInputElement;

  setUsernameRef = (input: HTMLInputElement) => {
    this.usernameInput = input;
  };

  renderInput = (
    inputId: string,
    inputType: string,
    inputLabel: string,
    inputRef?: (HTMLInputElement) => void,
  ) => {
    const hasError = !!this.state.formErrors[inputId];
    const inputProps = {
      className: this.inputClassName(hasError),
      type: inputType,
      name: inputId,
      id: inputId,
      onChange: this.handleInputChange,
      value: this.state[inputId],
      ...inputRef && { ref: inputRef },   // if inputRef provided, add ref prop
    };

    return (
      <div>
        <label className={this.labelClassName(!!this.state.formErrors[inputId])} htmlFor={inputId}>
          {inputLabel}
        </label>
        <input {...inputProps} />
        {this.renderInputError(this.state.formErrors[inputId])}
      </div>
    );
  };

  renderInputError = (errorMessage: string) => (
    <div className="ml2 mt1 dark-red">{errorMessage}</div>
  );

  labelClassName = (error: boolean): string => (
    classNames(
      "db fw6 lh-copy f6",
      { "dark-red": error },
    )
  );

  inputClassName = (error: boolean): string => (
    classNames(
      "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",
      { "dark-red": error },
    )
  );

  resetForm = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formErrors: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
    this.usernameInput.focus();
  };

  handleInputChange = (event: Event) => {
    // NOTE: although you see this handleInputChange example in react docs, it is
    // getting a flow error. and may be pointing out why simulate change doesn't
    // work without setting node value first. (see notes in jest file).

    // $FlowFixMe
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const formErrors = { ...this.state.formErrors };

    if (this.state.password !== this.state.confirmPassword) {
      formErrors.confirmPassword = "Password and Confirm Password fields do not match.";
    }

    this.setState({ formErrors });
  };

  formIsValid = (): boolean => (
    this.state.formErrors.confirmPassword.length === 0
  );

  onSubmit = (event: Event) => {
    event.preventDefault();

    this.validateForm();

    if (this.formIsValid()) {
      const { username, email, password } = this.state;
      this.resetForm();
      this.props.handleSubmit(username, email, password);
    }
  };

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div className="pt2 pl4 pr4 pb4">
        <form className="measure center" onSubmit={this.onSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Create Account</legend>
            <div className="mt3">
              {this.renderInput("username", "text", "Username", this.setUsernameRef)}
            </div>
            <div className="mt3">
              {this.renderInput("email", "email", "Email")}
            </div>
            <div className="mv3">
              {this.renderInput("password", "password", "Password")}
            </div>
            <div className="mv3">
              {this.renderInput("confirmPassword", "password", "Confirm Password")}
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
  }
}

export default CreateAccount;
