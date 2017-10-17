// @flow
import React from "react";
import { Grid, Row, Col } from "../helpers/reactBootstrapLib";
import UserMenuContainer from "../containers/UserMenuContainer";

type INavbarProps = {
  username: ?string,
};

const Navbar = ({ username }: INavbarProps) => (
  <div id="navbar" className="nav__bar">
    <Grid fluid>
      <Row>
        <Col xs={4} className="show-grid">
          <img
            className="nav__logo"
            src="/images/EDH-logo.png"
            alt="Eat Drink Healthy logo"
          />
          <span className="nav__title">EAT. DRINK. HEALTHY.</span>
        </Col>
        <Col xs={1}>
          <span>{username}</span>
        </Col>
        <Col xs={6} className="show-grid">
          <span className="nav__usermenu"><UserMenuContainer /></span>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Navbar;
