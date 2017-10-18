// @flow
import { Meteor } from "meteor/meteor";
import userHOC from "./userHOC";
import UserMenu from "../components/UserMenu";

const moreProps = {
  logout: () => Meteor.logout(),
};

// $FlowFixMe
const UserMenuContainer = userHOC(UserMenu, moreProps);

export default UserMenuContainer;
