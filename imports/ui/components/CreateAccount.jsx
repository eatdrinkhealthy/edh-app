// @flow
import React, { Component } from "react";

class CreateAccount extends Component {

  email: HTMLInputElement;

  username: HTMLInputElement;

  password: HTMLInputElement;

  confirmPassword: HTMLInputElement;

  onSubmit = (event: Event) => {
    event.preventDefault();

    console.log("username:", this.username.value);
    console.log("email:", this.email.value);
    console.log("password:", this.password.value);
    console.log("confirmPassword:", this.confirmPassword.value);
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
                ref={(el: HTMLInputElement) => { this.username = el; }}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                ref={(el: HTMLInputElement) => { this.email = el; }}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                ref={(el: HTMLInputElement) => { this.password = el; }}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="confirm-password">Confirm Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="confirm-password"
                id="confirm-password"
                ref={(el: HTMLInputElement) => { this.confirmPassword = el; }}
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
