// @flow
import AlertMessage from "../ui/components/AlertMessage";

export const alertLocation = () => {
  if (!navigator.geolocation) {
    throw new Error("GeolocationNotSupported");
  }

  function gotLoc(position) {
    AlertMessage.success(`latLng position: ${position.coords.latitude} , ${position.coords.longitude}`);
  }

  function gotLocError() {
    AlertMessage.warning("unable to get position.");
  }

  navigator.geolocation.getCurrentPosition(gotLoc, gotLocError);
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

  alertLocation();
};
