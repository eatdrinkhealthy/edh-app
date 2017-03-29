// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";
import foursquareApiSearch from "./foursquare/foursquareApi";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
) => {
  const categories = filterList.map(filter => (filter.foursquareCategory));

  if (Meteor.isServer) {
    foursquareApiSearch(categories[0], latitude, longitude, (error, result) => {
      if (!error) {
        console.log("result:", result);
      } else {
        console.log("error:", error);
      }
    });
  }

  return categories;
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

  run({ latitude, longitude, filterList }) {
    return collectSearchResults(latitude, longitude, filterList);
  },
});
