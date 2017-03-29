// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import foursquareApiSearch from "./foursquare/foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IApiError, IFoursquareApiResult } from "./foursquare/foursquareApi";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
): Array<string> => {
  const categories = filterList.map((filter: IFilter): string => (filter.foursquareCategory));

  if (Meteor.isServer) {
    foursquareApiSearch(categories[0], latitude, longitude,
      (error: IApiError, result: IFoursquareApiResult) => {
        if (!error) {
          const JSONresponse = JSON.parse(result.content);
          const venueList = JSONresponse.response.venues.map(venue => ({
            id: venue.id,
            name: venue.name,
          }));
          console.log("result:", venueList);
        } else {
          console.error("type:", typeof error);
          console.log("error.message:", error.message);
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
