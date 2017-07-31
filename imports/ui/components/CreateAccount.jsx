// @flow
import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import type { IMeteorError } from "meteor/meteor";
import AlertMessage from "./AlertMessage";


class CreateAccount extends Component {

  email: HTMLInputElement;

  username: HTMLInputElement;

  password: HTMLInputElement;

  confirmPassword: HTMLInputElement;

  onSubmit = (event: Event) => {
    event.preventDefault();

    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const errors = [];

    if (this.password.value !== this.confirmPassword.value) {
      errors.push("Password and Confirm Password fields do not match.");
    }

    if (errors.length) {
      errors.forEach((error: string): void => AlertMessage.warning(error));
    } else {
      Accounts.createUser({
        username,
        email,
        password,
      }, (error: IMeteorError) => {
        if (error) {
          // Using error.reason here to determine what message to display, keeps
          // internationalization string usage on client side
          // TODO map error.reason potential values to user friendly messages
          const createUserErrorMsg = error.reason;
          AlertMessage.warning(createUserErrorMsg);
        } else {
          AlertMessage.success("Welcome!");
        }
      });
    }
  }

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div className="pt2 pl4 pr4 pb4">
        <form className="measure center" onSubmit={this.onSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Create Account</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="username"
                id="username"
                ref={(el: HTMLInputElement) => {
                  this.username = el;
                }}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                ref={(el: HTMLInputElement) => {
                  this.email = el;
                }}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                ref={(el: HTMLInputElement) => {
                  this.password = el;
                }}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="confirm-password">Confirm Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="confirm-password"
                id="confirm-password"
                ref={(el: HTMLInputElement) => {
                  this.confirmPassword = el;
                }}
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
  }
}

export default CreateAccount;
