// @flow
import React, {
  Component,
} from "react";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
// import getNearbyPlaces from "../../api/methods";

class MapContainer extends Component {
  componentWillMount() {
    // call nearbyPlaces method (send filter list)
    // getNearbyPlaces.call({
    //   latitude: 0,
    //   longitude: 0,
    //   filterList:
    // })
  }

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <div>
        <Navbar />
        <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
      </div>
    );
  }
}

export default MapContainer;
