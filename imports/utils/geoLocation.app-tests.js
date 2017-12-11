// @flow
import { configure as configureMockLocation } from "meteor/svub:mock-location";
import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
  // mock navigator.geolocation ( .getCurrentPosition, .watchPosition )
  configureMockLocation([32.7890011, -79.932111]);
}
