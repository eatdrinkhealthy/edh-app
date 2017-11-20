// Hand creating meteor react-meteor-data libdef
declare module "meteor/react-meteor-data" {
  declare export function createContainer(
    reactiveFunction: () => object,
    component: React$Component<*, * , *>,
  ): React$Component;
}
