// @flow
import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

// eslint-disable-next-line no-duplicate-imports
import type { IHttpResult } from "meteor/http";

import type { IVenue } from "../../state/reducers/searchResultsReducers";

type IFoursquareVenue = {
  id: string,
  name: string,
  location: {
    lat: number,
    lng: number,
    address: string,
    city: string,
    postalCode: string,
  },
  categories: Array<{
    name: string,
  }>
};

export const parseFoursquareResponse = (
  response: IHttpResult,
): Array<IVenue> => {
  let resultArray = [];

  if (response.content) {
    const content = JSON.parse(response.content);

    if (content.response.venues) {
      resultArray = content.response.venues.map(
        (venue: IFoursquareVenue): IVenue => ({
          id: venue.id,
          name: venue.name,
          location: {
            lat: venue.location.lat,
            lng: venue.location.lng,
            address: venue.location.address,
            city: venue.location.city,
            postalCode: venue.location.postalCode,
          },
          primaryCategory: venue.categories[0].name,
        }),
      );
    }
  }

  return resultArray;
};

export const httpCallFoursquareSearch = (
  category: string,
  latitude: number,
  longitude: number,
): IHttpResult => {
  const latLng = `${latitude},${longitude}`;
  let apiResult;

  try {
    apiResult = HTTP.call("GET", "https://api.foursquare.com/v2/venues/search", {
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
  } catch (e) {
    // TODO log this exception to a logger service !!!
    apiResult = {
      statusCode: null,
      content: null,
      data: null,
      headers: {},
    };
  }

  return apiResult;
};

const foursquareApiSearch = (
  category: string,
  latitude: number,
  longitude: number,
): Array<IVenue> => {
  const httpResponse = httpCallFoursquareSearch(category, latitude, longitude);

  return parseFoursquareResponse(httpResponse);
};

export default foursquareApiSearch;
