declare module "meteor/meteor" {

  declare type IMeteorSettings = {
    public: {
      googleMapsApiKey: string,
    }
  };

  declare export var Meteor: {
    settings: IMeteorSettings;
    startup(): void;
  }
}