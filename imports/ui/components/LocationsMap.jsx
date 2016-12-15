import React, { PropTypes, PureComponent } from "react";
import GoogleMap from "google-map-react";
import { Meteor } from "meteor/meteor";

/* global Geolocation  */

export default class LocationsMap extends PureComponent {
  componentDidMount() {
    console.log("current location:", Geolocation.latLng());
  }

  render() {
    return (
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{ key: Meteor.settings.public.googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
    );
  }
}

LocationsMap.defaultProps = {
  center: { lat: 32.789008, lng: -79.932115 },
  zoom: 9,
};

LocationsMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
};
