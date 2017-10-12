// @flow
import React from "react";
import { Grid, Row, Col } from "../helpers/reactBootstrapLib";
import UserMenuContainer from "../containers/UserMenuContainer";

const Navbar = (): React$Element<*> => (
  <div id="navbar" className="nav container-fluid">
    <Grid>
      <Row>
        <Col xs={6}>
          <div className="nav__title">Eat Drink Healthy</div>
        </Col>
        <Col xs={6}>
          <UserMenuContainer />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Navbar;
