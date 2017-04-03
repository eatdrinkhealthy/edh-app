// @flow
import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

// eslint-disable-next-line no-duplicate-imports
import type { IHttpResult } from "meteor/http";
import type { IFilter } from "../data/state/data/defaultFiltersTypes";

export type IFoursquareVenue = {
  // per foursquare docs, https://developer.foursquare.com/docs/responses/venue
  id: string,
  name: string,
  location: {},
  // other fields are provided, but not needed at this time.
};

export const parseFoursquareResponse = (response: IHttpResult): Array<IFoursquareVenue> => {
  const JSONresponse = JSON.parse(response.content);

  return JSONresponse.response.venues.map(
    (venue: IFoursquareVenue): IFoursquareVenue => ({
      id: venue.id,
      name: venue.name,
      location: venue.location,
    }),
  );
};

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  filterList: Array<IFilter>,
): Array<IFoursquareVenue> => {
  const categories = filterList.map((filter: IFilter): string => (filter.foursquareCategory));
  let result = [];

  if (Meteor.isServer) {
    try {
      // TODO this.unblock()  OR  should this be run asynchronously ?
      const latLng = `${latitude},${longitude}`;
      const response = HTTP.call("GET", "https://api.foursquare.com/v2/venues/search", {
        params: {
          client_id: Meteor.settings.foursquare.client_id,
          client_secret: Meteor.settings.foursquare.client_secret,
          v: "20130815", // api version
          ll: latLng,
          limit: "50",
          intent: "browse",
          radius: "1000", // in meters
          categoryId: categories[0],
        },
      });

      result = parseFoursquareResponse(response);
    } catch (e) {
      throw new Meteor.Error(e.message);
    }
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
