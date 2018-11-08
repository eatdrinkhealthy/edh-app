// @flow
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "./ReactBootstrapLib";

// TODO refactor, TBD combine with Navbar?
const Header = () => (
  <div id="header" className="header_bar">
    <Grid fluid>
      <Row>
        <Col xs={6}>
          <img
            className="header_logo"
            src="/images/EDH-logo.png"
            alt="Eat Drink Healthy logo"
          />
          <span className="header_title">EAT. DRINK. HEALTHY.</span>
        </Col>
        <Col xs={6}>
          <span className="header_menu">
            <Link id="homeLink" className="btn solid_button" to="/">
              Search
            </Link>
          </span>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Header;
