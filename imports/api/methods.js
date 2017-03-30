// @flow
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import foursquareApiSearch from "./foursquare/foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IHttpError, IHttpResult } from "./foursquare/foursquareApi";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";

type IFoursquareVenue = {
  // per foursquare developers documentation
  // https://developer.foursquare.com/docs/responses/venue
  id: string,
  name: string,
  location: {},
  // other fields are provided, but not needed at this time.
};

export const foursquareApiSearchCB = (error: IHttpError, result: IHttpResult) => {
  if (!error) {
    const JSONresponse = JSON.parse(result.content);
    const venueList = JSONresponse.response.venues.map(
      (venue: IFoursquareVenue): IFoursquareVenue => ({
        id: venue.id,
        name: venue.name,
        location: venue.location,
      }),
    );

    console.log("result:", venueList);
    // TODO return venueList to client
  } else {
    console.error("type:", typeof error);
    console.log("error:", error);
    // TODO return error to client (could just throw here?)
  }
};

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
): Array<string> => {
  const categories = filterList.map((filter: IFilter): string => (filter.foursquareCategory));

  if (Meteor.isServer) {
    foursquareApiSearch(
      categories[0],  // TODO map through each category
      latitude,
      longitude,
      foursquareApiSearchCB,
    );
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

  // eslint-disable-next-line flowtype/require-parameter-type
  run({ latitude, longitude, filterList }): Array<string> {
    return collectSearchResults(latitude, longitude, filterList);
  },
});
