// @flow

export const geoLocation = () => {
  let latLng = Geolocation.latLng();

  if (!latLng) {
    // mdg:geolocation seems to return null the first time it is called, try again
    latLng = Geolocation.latLng();
    if (!latLng) {
      // if after a second failure, see if a Geolocation error occurred
      const positionError = Geolocation.error();
      if (positionError) {
        throw positionError;
      }
    }
  }

  return latLng;
};

export const geoLocation2 = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported by this browser.");
    return;
  }

  function gotLoc(position) {
    console.log("latLng position:", position.coords.latitude, position.coords.longitude);
  }

  function gotLocError() {
    console.log("unable to get position.");
  }

  navigator.geolocation.getCurrentPosition(gotLoc, gotLocError);
};

export const initGeoLocation = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported by this browser.");
    return;
  }

  // start Geolocation watching for positions, and check for any errors
  const glError = Geolocation.error();
  if (glError) {
    console.log("geolocation initialization error:", glError);
  }

  const initialLocation = Geolocation.currentLocation();
  if (initialLocation) {
    console.log("geolocation initial position:", initialLocation);
  } else {
    console.log("Determining geolocation...");
  }
};
