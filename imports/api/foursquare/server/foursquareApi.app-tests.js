// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { httpCallFoursquareSearch } from "./foursquareApi";

if (Meteor.isServer) {
  describe("Foursquare API", function() {
    it("should match the documented format for v20170801", function() {
      // call API with Restaurant category, and Charleston coordinates
      const httpResponse = httpCallFoursquareSearch(
        "4bf58dd8d48988d1c4941735",
        32.789008,
        -79.932115,
      );

      // standard http response
      assert.isObject(httpResponse);
      assert.isNumber(httpResponse.statusCode);
      assert.isString(httpResponse.content);
      assert.isObject(httpResponse.headers);
      assert.isObject(httpResponse.data);

      // foursquare specific response data
      // $FlowFixMe
      const contentObj = JSON.parse(httpResponse.content);
      const venuesArray = contentObj.response.venues;
      assert.isArray(venuesArray);

      // look for currently used and relevant keys
      const venue = venuesArray[0];
      assert.isString(venue.id);
      assert.isString(venue.name);
      assert.isObject(venue.location);
      assert.isString(venue.location.address);
      assert.isNumber(venue.location.lat);
      assert.isNumber(venue.location.lng);
      assert.isNumber(venue.location.distance);
      assert.isString(venue.location.postalCode);
      assert.isString(venue.location.city);
      assert.isString(venue.location.state);
      assert.isString(venue.location.country);
      assert.isArray(venue.categories);
      assert.isString(venue.categories[0].id);
      assert.isString(venue.categories[0].name);
      assert.isBoolean(venue.categories[0].primary);
      // NOTE: chai assert containsAllKeys and similar functions were undefined
      //        -was also consider using lodash, but took straightforward,
      //         explicit approach
    });
  });
}

/*   captured from api test response, 12/21/17
const sampleVenue = {
  id: "564fc27f498e03abff605da0",
  name: "5 Church Charleston",
  contact:
    {
      // each property may or may not exist
      twitter: "5churchchs",
      phone: "",
      formattedPhone: "",
    },
  location:
    {
      // each property may or may not exist
      address: "32 N Market St Ste B",
      crossStreet: "",
      lat: 32.781246268290104,
      lng: -79.92781725208974,
      labeledLatLngs: [{}], // undocumented property
      distance: 953,        // meters
      postalCode: "29401",
      cc: "US",
      city: "Charleston",
      state: "SC",
      country: "United States",
      formattedAddress:
        // undocumented property
        [
          "32 N Market St Ste B",
          "Charleston, SC 29401",
          "United States",
        ],
    },
  categories:
    [{
      id: "4bf58dd8d48988d1c4941735",
      name: "Restaurant",
      pluralName: "Restaurants",
      shortName: "Restaurant",
      icon: [{}],
      primary: true,
    }],
  verified: false,
  stats:
    {
      checkinsCount: 609,
      usersCount: 559,
      tipCount: 8,
    },
  allowMenuUrlEdit: true,
  beenHere: { lastCheckinExpiredAt: 0 },
  specials: { count: 0, items: [] },
  referralId: "v-1513885717",
  venueChains: [],
  hasPerk: false,
  // documented properties, but weren't included in response (perhaps in venue detail)
  url: "",
  menu:
    {
      url: "",
      mobileUrl: "",
    },
  price:
    {
      tier: 1,
      message: "",
    },
  hereNow: {},
  createdAt: 1,
  // also: photos, tips, beenHere, shortUrl, canonicalUrl, like, dislike, roles
};
*/
