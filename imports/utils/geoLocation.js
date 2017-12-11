// @flow
import type { ILatLng } from "google-map-react";
import _ from "lodash";
import AlertMessage from "../ui/components/AlertMessage";
//
// NOTE: the mdg:geolocation is installed, which simply relies on navigator.geolocation
//       however the mdg package also installs a cordova plugin for devices that may not
//       natively support navigator.geolocation
//
//       calls can be made to navigator.geolocation directly as needed (in addition to
//       making calls to Geolocation (mdg:geolocation)
//

function positionError() {
  AlertMessage.warning("Unable to get geolocation.");
  const glError = Geolocation.error();
  if (glError) {
    // throw glError;
  }
}

export const roundedLatLng = (latLng: ILatLng): ILatLng => (
  {
    lat: Number(latLng.lat.toFixed(7)),
    lng: Number(latLng.lng.toFixed(7)),
  }
);

export const sameRoundedLocation = (latLngA: ?ILatLng, latLngB: ?ILatLng): boolean => {
  if (!latLngA || !latLngB) { // if either are not defined, return false
    return false;
  }

  const roundedLlA = roundedLatLng(latLngA);
  const roundedLlB = roundedLatLng(latLngB);

  return _.isEqual(roundedLlA, roundedLlB);
};

export const getPosition = (positionFound: (position: Position) => void) => {
  navigator.geolocation.getCurrentPosition(positionFound, positionError);
};

const options = {
  enableHighAccuracy: true,
  timeout: 7000,
  maximumAge: 0,
};

// NOTE: this does return an id returned from watchPosition
export const watchPosition = (positionFound: (position: Position) => void): number =>
  navigator.geolocation.watchPosition(positionFound, positionError, options);

export const clearWatchPosition = (id: number) => navigator.geolocation.clearWatch(id);

export const initGeolocation = () => {
  if (!navigator.geolocation) {
    throw new Error("GeolocationNotSupported");
  }

  // start Geolocation watching for positions, and check for any errors
  const glError = Geolocation.error();
  if (glError) {
    throw glError;
  }
};
