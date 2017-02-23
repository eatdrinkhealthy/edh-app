// TODO confirm googleMapsApiKey type is being passed to flow checking (try with various types)
type IMeteorSettings = {
  settings: {
    public: {
      googleMapsApiKey: string,
    }
  }
};

declare module "meteor/meteor" {
  declare var Meteor: IMeteorSettings;
}