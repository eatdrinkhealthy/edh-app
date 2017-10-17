// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import UserMenu from "../components/UserMenu";

export const userHOC = (
  WrappedComponent: React$Component<*, *, *>,
  props: {},
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const userContainer = createContainer(() => {
    const user = Meteor.user();
    const username = user && user.username;

    return {
      username,
      ...props,
    };
  }, WrappedComponent);

  // $FlowFixMe
  userContainer.displayName = `HOC(${displayName})`;

  return userContainer;
};

const props = {
  logout: () => Meteor.logout(),
};

// $FlowFixMe
const UserMenuContainer = userHOC(UserMenu, props);

export default UserMenuContainer;
