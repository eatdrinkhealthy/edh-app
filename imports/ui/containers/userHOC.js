// @flow
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

const userHOC = (
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

export default userHOC;
