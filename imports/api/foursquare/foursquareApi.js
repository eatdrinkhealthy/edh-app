// @flow
import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

const foursquareApiSearch = (
  category: string,
  latitude: number,
  longitude: number,
  cb: () => void,
) => {
  const latLng = `${latitude},${longitude}`;

  HTTP.call("GET", "https://api.foursquare.com/v2/venues/search", {
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
  }, cb);
};

export default foursquareApiSearch;
