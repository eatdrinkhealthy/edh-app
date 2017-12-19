// @flow
import React, { Component } from "react";
import type { RouterHistory, Location } from "react-router-dom";
import CreateAccountContainer from "../containers/CreateAccountContainer";
import LoginContainer from "../containers/LoginContainer";
import { searchProperty } from "../../utils/routeLocation";
import {
  Grid,
  Row,
  Col,
  Jumbotron,
} from "./ReactBootstrapLib";
import Header from "../components/Header";

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
      <div id="sidebarPage">
        <Header />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Jumbotron>
                <div className="pitch">
                  A platform to find, share, and discuss healthy places to shop and eat.
                </div>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              {this.actionForm()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Sidebar;
