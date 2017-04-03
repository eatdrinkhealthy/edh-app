// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import foursquareApiSearch from "./foursquare/foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IFoursquareVenue } from "./foursquare/foursquareApi";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
): Array<IFoursquareVenue> => {
  const categories = filterList.map((filter: IFilter): string => (filter.foursquareCategory));
  let result = [];

  if (Meteor.isServer) {
    // TODO this.unblock()  OR  should this be run asynchronously ?
    result = foursquareApiSearch(categories[0], latitude, longitude);
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
  run({ latitude, longitude, filterList }): Array<IFoursquareVenue> {
    return collectSearchResults(latitude, longitude, filterList);
  },
});
