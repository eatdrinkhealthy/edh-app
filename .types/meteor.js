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

  declare export class IMeteorError {
    constructor(error: string | number, reason?: string, details?: string): IMeteorError;

    error: string | number;
    reason?: string;
    details?: string;
  }

  declare export type IMeteorUser = {
    username: string,
    _id: string,
    emails: [],
  };

  declare export var Meteor: {
    settings: IMeteorSettings,
    startup(): void,
    Error: IMeteorError,
    isClient: boolean,
    isServer: boolean,
    user(): IMeteorUser,
    userId(): string,
    _sleepForMs(number): void,
    setTimeout(func: any, delay?: number): void,
    logout(callback?: (err?: IMeteorError) => void): void,
    loginWithPassword(
      string | IMeteorUser,
      string,
      callback?: (err?: IMeteorError) => void
    ): void,
  }
}
