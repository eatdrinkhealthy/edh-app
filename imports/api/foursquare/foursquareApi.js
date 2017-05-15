// @flow
import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

// eslint-disable-next-line no-duplicate-imports
import type { IHttpResult } from "meteor/http";

export type IFoursquareVenue = {
  id: string,
  name: string,
  location: {
    lat: number,
    lng: number,
    address: string,
    city: string,
    postalCode: string,
  },
  primaryCategory: string,
};

export const parseFoursquareResponse = (
  response: IHttpResult,
): Array<IFoursquareVenue> => {
  const contentObj = JSON.parse(response.content);

  return contentObj.response.venues.map(
    (venue: IFoursquareVenue): IFoursquareVenue => ({
      id: venue.id,
      name: venue.name,
      location: {
        lat: venue.location.lat,
        lng: venue.location.lng,
        address: venue.location.address,
        city: venue.location.city,
        postalCode: venue.location.postalCode,
      },
      // primaryCategory: venue.categories[0].name,
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
