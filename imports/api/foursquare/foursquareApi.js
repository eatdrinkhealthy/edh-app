// @flow
import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

// eslint-disable-next-line no-duplicate-imports
import type { IHttpResult } from "meteor/http";

export type IFoursquareVenue = {
  id: string,
  name: string,
  location: {},
};

export const parseFoursquareResponse = (
  response: IHttpResult,
): Array<IFoursquareVenue> => {
  const JSONresponse = JSON.parse(response.content);

  return JSONresponse.response.venues.map(
    (venue: IFoursquareVenue): IFoursquareVenue => ({
      id: venue.id,
      name: venue.name,
      location: venue.location,
    }),
  );
};

export const httpCallFoursquareSearch = (
  category: string,
  latitude: number,
  longitude: number,
): IHttpResult => {
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
      categoryId: category,
    },
  });

  return response;
};

const foursquareApiSearch = (
  category: string,
  latitude: number,
  longitude: number,
): Array<IFoursquareVenue> => {
  const httpResponse = httpCallFoursquareSearch(category, latitude, longitude);

  return parseFoursquareResponse(httpResponse);
};

export default foursquareApiSearch;
