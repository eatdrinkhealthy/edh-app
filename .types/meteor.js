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
    constructor(
      error: string | number,
      reason?: string,
      details?: string | Array<{}>,
    ): IMeteorError;

    error: string | number;
    reason?: string;
    details?: string | Array<IValidationErrorDetail>;  // Meteor.Error can be a ValidationError
  }

  declare export type IMeteorCallback = (err?: IMeteorError, res: any) => void;

  declare export type IMeteorMongoSelector = string | {};

  declare export type IMeteorMongoModifier = {};

  declare export type IMeteorMongoOptions = {
    multi?: boolean,
    upsert?: boolean,
  };

  declare export type IMeteorAllowDenyOptions = {
    insert?: () => boolean,
    update?: () => boolean,
    remove?: () => boolean,
    fetch?: [string],
  };

  declare export type IMeteorCollection = {
    update: (
      IMeteorMongoSelector,
      IMeteorMongoModifier,
      options?: IMeteorMongoOptions,
      callback?: IMeteorCallback
    ) => number | void,
    remove: (
      IMeteorMongoSelector,
      callback?: IMeteorCallback
    ) => number,
    deny: (IMeteorAllowDenyOptions) => void,
    simpleSchema: SimpleSchema, // storing simpleSchema in collection is a custom, but known practice
  };

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
    user(): ?IMeteorUser,
    userId(): string,
    users: IMeteorCollection,
    _sleepForMs(number): void,
    setTimeout(func: any, delay?: number): void,
    logout(callback?: IMeteorCallback): void,
    loginWithPassword(
      string | IMeteorUser,
      string,
      callback?: (err?: IMeteorError) => void
    ): void,
    methods({}): void,
  }
}
