// @flow
import React from "react";
import { Grid, Row, Col } from "../helpers/reactBootstrapLib";
import UserMenu from "./UserMenu";

type INavbarProps = {
  username: ?string,
  userLoggedIn?: boolean, // eslint-disable-line react/require-default-props
  logout: () => void,
};

const Navbar = ({
  username,
  userLoggedIn,
  logout,
}: INavbarProps) => {
  const usernameDisplay = username ? `Welcome, ${username}!` : "";

  return (
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
          <Col id="loggedInUser" xs={4} className="show-grid nav__username">
            {usernameDisplay}
          </Col>
          <Col xs={4} className="show-grid">
            <span className="nav__usermenu">
              <UserMenu userLoggedIn={userLoggedIn} logout={logout} />
            </span>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Navbar;
