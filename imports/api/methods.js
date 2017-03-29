// @flow
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import foursquareApiSearch from "./foursquare/foursquareApi";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
) => {
  const searchResults = filterList.map(filter => (filter.name));


  // if (!filterList.length) {
  // send search results for no filter  (not filtered) restaurant? default filter?
  // } else {
  // send concat'd list for each filter
  // }

  return searchResults;
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
    latitude: { type: Number },
    longitude: { type: Number },
    filterList: { type: [FilterSchema] },
  }).validator(),

  run({ latitude, longitude, filterList }) {
    return collectSearchResults(latitude, longitude, filterList);
  },
});
