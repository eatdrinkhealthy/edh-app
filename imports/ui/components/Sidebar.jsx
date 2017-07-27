// @flow
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (): React$Element<*> => (
  <div className="sidebar">
    <Link to="/">Home</Link>
    <h2 className="mh4">Eat Drink Healthy</h2>
    <div className="pitch">
      A platform to find, share, and discuss healthy places to shop and eat.
    </div>
    <div className="get-started">Get Started</div>
    <div className="pt2 pl4 pr4 pb4">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <label className="pa0 ma0 lh-copy f6 pointer" htmlFor="remember">
            <input type="checkbox" id="remember" /> Remember me
          </label>
        </fieldset>
        <div className="">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt3">
          <a href="#0" className="f6 link dim black db">Sign up</a>
          <a href="#0" className="f6 link dim black db">Forgot your password?</a>
        </div>
      </form>
    </div>
  </div>
);

export default Sidebar;
