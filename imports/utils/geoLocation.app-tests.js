// @flow
import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
  // This mock navigator.geolocation implementation is derived from the svub:mock-location package.
  // It allows integration and end-to-end tests to successfully execute on SemaphoreCI.

  const mockLocation = [32.7890011, -79.932111];

  const mockSuccess = callback => {
    callback({
      coords: {
        accuracy: 30,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: mockLocation[0],
        longitude: mockLocation[1],
        speed: null,
      },
      timestamp: Date.now(),
    });
  };

  // overwrite / mock navigator.geolocation .getCurrentPosition & .watchPosition
  navigator.geolocation.getCurrentPosition = callback => {
    mockSuccess(callback);
  };

  navigator.geolocation.watchPosition = callback => {
    const execute = () => {
      mockSuccess(callback);
    };
    setTimeout(execute, 2500);
    setInterval(execute, 30000);
  };
}
