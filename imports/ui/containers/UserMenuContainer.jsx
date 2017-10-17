// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import UserMenu from "../components/UserMenu";

export const userHOC = (
  WrappedComponent: React$Component<*, *, *>,
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const userContainer = createContainer(() => {
    const user = Meteor.user();
    const username = user && user.username;

    const logout = () => {
      Meteor.logout();
    };

    return {
      username,
      logout,
    };
  }, WrappedComponent);

  // $FlowFixMe
  userContainer.displayName = `HOC(${displayName})`;

  return userContainer;
};

// $FlowFixMe
const UserMenuContainer = userHOC(UserMenu);

export default UserMenuContainer;
