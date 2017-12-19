// @flow
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "./ReactBootstrapLib";

// TODO refactor, TBD combine with Navbar?
const Header = () => (
  <div id="header" className="nav__bar">
    <Grid fluid>
      <Row>
        <Col xs={6}>
          <img
            className="nav__logo"
            src="/images/EDH-logo.png"
            alt="Eat Drink Healthy logo"
          />
          <span className="nav__title">EAT. DRINK. HEALTHY.</span>
        </Col>
        <Col xs={6}>
          <span className="nav__usermenu">
            <Link
              id="homeLink"
              className="btn join_button"
              to="/"
            >
              Search
            </Link>
          </span>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Header;
