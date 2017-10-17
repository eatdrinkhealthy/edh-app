// @flow
import { userHOC } from "../containers/UserMenuContainer";
import Navbar from "../components/Navbar";

// $FlowFixMe
const NavbarContainer = userHOC(Navbar);

export default NavbarContainer;
