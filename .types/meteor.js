declare module "meteor/meteor" {

  declare type IMeteorSettings = {
    public: {
      googleMapsApiKey: string,
    },
    foursquare: {
      client_id: string,
      client_secret: string,
    }
  };

  declare export var Meteor: {
    settings: IMeteorSettings;
    startup(): void;
    Error: {};
  }
}
