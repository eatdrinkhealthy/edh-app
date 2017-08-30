// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import type { RouterHistory, Location } from "react-router-dom";
import CreateAccountContainer from "../containers/CreateAccountContainer";
import LoginContainer from "../containers/LoginContainer";
import { searchProperty } from "../../utils/routeLocation";

/* eslint-disable react/require-default-props */

class Sidebar extends Component {
  props: {
    history?: RouterHistory,
    location?: Location,
  };

  actionForm() {
    const action = searchProperty(this.props.location, "action");

    switch (action) {
      case "signup":
        return <CreateAccountContainer routerHistory={this.props.history} />;

      case "login":
        return <LoginContainer routerHistory={this.props.history} />;

      default:
        return <div />;
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Link to="/">Home</Link>
        <h2 className="mh4">Eat Drink Healthy</h2>
        <div className="pitch">
          A platform to find, share, and discuss healthy places to shop and eat.
        </div>
        <div className="get-started">Get Started</div>
        {this.actionForm()}
      </div>
    );
  }
}


export default Sidebar;
