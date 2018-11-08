// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

const userHOC = (WrappedComponent: React$Component<*, *, *>) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const userContainer = createContainer(() => {
    const user = Meteor.user();
    const username = user && user.username;
    const logout = () => Meteor.logout();

    return {
      username,
      userLoggedIn: !!user,
      logout,
    };
  }, WrappedComponent);

  // $FlowFixMe
  userContainer.displayName = `HOC(${displayName})`;

  return userContainer;
};

export default userHOC;
