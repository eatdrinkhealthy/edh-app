// @flow
import React, { Component } from "react";

class Login extends Component {
  props: {
    handleSubmit: (usernameEmail: string, password: string) => void,
  };

  state = {
    usernameEmail: "",
    loginPassword: "",
  };

  componentDidMount() {
    this.usernameEmailInput.focus();
  }

  usernameEmailInput: HTMLInputElement;

  resetForm = () => {
    this.setState({
      usernameEmail: "",
      loginPassword: "",
    });
    this.usernameEmailInput.focus();
  }

  handleInputChange = (event: Event) => {
    // NOTE: although you see this handleInputChange example in react docs, it is
    // getting a flow error. and may be pointing out why simulate change doesn't
    // work without setting node value first. (see notes in jest file).

    // $FlowFixMe
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit = (event: Event) => {
    event.preventDefault();

    this.resetForm();
    this.props.handleSubmit(this.state.usernameEmail, this.state.loginPassword);
  }

  render() {
    return (
      <div className="pt2 pl4 pr4 pb4">
        <form
          className="measure center"
          onSubmit={this.onSubmit}
        >
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Login</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="usernameEmail">Username / Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="usernameEmail"
                id="usernameEmail"
                value={this.state.usernameEmail}
                onChange={this.handleInputChange}
                ref={(el: HTMLInputElement) => {
                  this.usernameEmailInput = el;
                }}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="loginPassword">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="loginPassword"
                id="loginPassword"
                value={this.state.loginPassword}
                onChange={this.handleInputChange}
              />
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
