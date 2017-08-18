// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import UserMenu from "../components/UserMenu";

const UserMenuContainer = createContainer(() => {
  const username = Meteor.user() && Meteor.user().username;

  return {
    username,
  };
}, UserMenu);

export default UserMenuContainer;
