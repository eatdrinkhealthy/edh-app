// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import _ from "lodash";
import foursquareApiSearch from "./foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IVenue } from "../../data/state/reducers/searchResultsReducers";
import type { IFilter } from "../../data/state/reducers/filtersReducers";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
): Array<IVenue> => {
  let result = [];

  if (Meteor.isServer) {
    filterList.forEach((filter: IFilter) => {
      result = _.unionBy(
        result,
        foursquareApiSearch(filter.foursquareCategory, latitude, longitude),
        "id",
      );
    });
  }

  return result;
};

const FilterSchema = new SimpleSchema({
  id: { type: String },
  name: { type: String },
  on: { type: Boolean },
  foursquareCategory: { type: String },
});

export const getNearbyPlaces = new ValidatedMethod({
  name: "getNearbyPlaces",

  validate: new SimpleSchema({
    latitude: { type: Number, decimal: true },
    longitude: { type: Number, decimal: true },
    filterList: { type: [FilterSchema] },
  }).validator(),

  // eslint-disable-next-line flowtype/require-parameter-type
  run({ latitude, longitude, filterList }): Array<IVenue> {
    // TODO use unblock? (if so, confirm `meteor test` still passes)
    // if (Meteor.isServer) {
    //   this.unblock();
    // }
    return collectSearchResults(latitude, longitude, filterList);
  },
});
