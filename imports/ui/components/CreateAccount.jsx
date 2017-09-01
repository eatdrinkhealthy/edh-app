// @flow
import React, { Component } from "react";
import classNames from "classnames";
import AlertMessage from "./AlertMessage";

class CreateAccount extends Component {
  props: {
    handleSubmit: (username: string, email: string, password: string) => void,
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

  onSubmit = (event: Event) => {
    event.preventDefault();

    const errors = [];

    if (this.state.password !== this.state.confirmPassword) {
      errors.push("Password and Confirm Password fields do not match.");
    }

    if (errors.length) {
      errors.forEach((error: string): void => AlertMessage.warning(error));
    } else {
      this.resetForm();
      this.props.handleSubmit(this.state.username, this.state.email, this.state.password);
    }
  };

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div className="pt2 pl4 pr4 pb4">
        <form
          className="measure center"
          onSubmit={this.onSubmit}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Create Account</legend>
            <div className="mt3">
              <label
                className={this.labelClassName(!!this.state.formErrors.username)}
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={this.inputClassName(!!this.state.formErrors.username)}
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                ref={(el: HTMLInputElement) => {
                  this.usernameInput = el;
                }}
              />
              {this.renderInputError(this.state.formErrors.username)}
            </div>
            <div className="mt3">
              <label
                className={this.labelClassName(!!this.state.formErrors.email)}
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={this.inputClassName(!!this.state.formErrors.email)}
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              {this.renderInputError(this.state.formErrors.email)}
            </div>
            <div className="mv3">
              <label
                className={this.labelClassName(!!this.state.formErrors.password)}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={this.inputClassName(!!this.state.formErrors.password)}
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              {this.renderInputError(this.state.formErrors.password)}
            </div>
            <div className="mv3">
              <label
                className={this.labelClassName(!!this.state.formErrors.confirmPassword)}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={this.inputClassName(!!this.state.formErrors.confirmPassword)}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
              />
              {this.renderInputError(this.state.formErrors.confirmPassword)}
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
