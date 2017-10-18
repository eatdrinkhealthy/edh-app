// @flow
import { Meteor } from "meteor/meteor";
import userHOC from "./userHOC";
import Navbar from "../components/Navbar";

const moreProps = {
  logout: () => Meteor.logout(),
};

// $FlowFixMe
const NavbarContainer = userHOC(Navbar, moreProps);

export default NavbarContainer;
