// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import type { RouterHistory, Location } from "react-router-dom";
import CreateAccountContainer from "../containers/CreateAccountContainer";

/* eslint-disable react/require-default-props */

class Sidebar extends Component {
  props: {
    history?: RouterHistory,
    location?: Location
  };

  render() {
    const searchStr = this.props.location && this.props.location.search;
    const searchObj = searchStr && queryString.parse(searchStr);
    console.log(searchObj);

    return (
      <div className="sidebar">
        <Link to="/">Home</Link>
        <h2 className="mh4">Eat Drink Healthy</h2>
        <div className="pitch">
          A platform to find, share, and discuss healthy places to shop and eat.
        </div>
        <div className="get-started">Get Started</div>
        <div>{searchStr}</div>
        <CreateAccountContainer routerHistory={this.props.history} />
      </div>
    );
  }
}


export default Sidebar;
