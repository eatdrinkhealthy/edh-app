// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import UserMenu from "../components/UserMenu";

const UserMenuContainer = createContainer(() => {
  const user = Meteor.user();
  const username = user && user.username;

  const logout = () => {
    Meteor.logout();
  };

  return {
    username,
    logout,
  };
}, UserMenu);

export default UserMenuContainer;