// @flow
import AlertMessage from "../ui/components/AlertMessage";

//
// NOTE: the mdg:geolocation is installed, which simply relies on navigator.geolocation
//       however the mdg package also installs a cordova plugin for devices that may not
//       natively support navigator.geolocation
//
//       calls can be made to navigator.geolocation directly as needed (in addition to
//       making calls to Geolocation (mdg:geolocation)
//

function locationError() {
  AlertMessage.warning("Unable to get geolocation.");
  const glError = Geolocation.error();
  if (glError) {
    throw glError;
  }
}

export const getLocation = (locationFound: (position: Position) => void) => {
  navigator.geolocation.getCurrentPosition(locationFound, locationError);
};

export const initGeoLocation = () => {
  if (!navigator.geolocation) {
    throw new Error("GeolocationNotSupported");
  }

  // start Geolocation watching for positions, and check for any errors
  const glError = Geolocation.error();
  if (glError) {
    throw glError;
  }
};
