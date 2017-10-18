// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import UserMenu from "../components/UserMenu";

export const userHOC = (
  WrappedComponent: React$Component<*, *, *>,
  moreProps?: {},
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const userContainer = createContainer(() => {
    const user = Meteor.user();
    const username = user && user.username;

    return {
      username,
      userLoggedIn: !!user,
      ...moreProps,
    };
  }, WrappedComponent);

  // $FlowFixMe
  userContainer.displayName = `HOC(${displayName})`;

  return userContainer;
};

const moreProps = {
  logout: () => Meteor.logout(),
};

// $FlowFixMe
const UserMenuContainer = userHOC(UserMenu, moreProps);

export default UserMenuContainer;
