// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import _ from "lodash";
import foursquareApiSearch from "./foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IVenue } from "../../state/reducers/searchResultsReducers";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  eatDrinkFilters: Array<IEatDrinkFilter>,
): Array<IVenue> => {
  let result = [];

  if (Meteor.isServer) {
    eatDrinkFilters.forEach((filter: IEatDrinkFilter) => {
      result = _.unionBy(
        result,
        foursquareApiSearch(filter.foursquareCategory, latitude, longitude),
        "id",
      );
    });
  }

  return result;
};

export const getNearbyPlaces = new ValidatedMethod({
  name: "getNearbyPlaces",

  // NOTE: ValidatedMethods automatically throw a ValidationError for invalid schemas
  validate: new SimpleSchema({
    latitude: { type: Number },
    longitude: { type: Number },
    eatDrinkFilters: { type: Array },
    "eatDrinkFilters.$": { type: Object },
    "eatDrinkFilters.$.id": { type: String },
    "eatDrinkFilters.$.name": { type: String },
    "eatDrinkFilters.$.on": { type: Boolean },
    "eatDrinkFilters.$.foursquareCategory": { type: String },
  }).validator(),

  // eslint-disable-next-line flowtype/require-parameter-type
  run({ latitude, longitude, eatDrinkFilters }): Array<IVenue> {
    // TODO use unblock? (if so, confirm `meteor test` still passes)
    // if (Meteor.isServer) {
    //   this.unblock();
    // }
    return collectSearchResults(latitude, longitude, eatDrinkFilters);
  },
});
