import React, {
  PropTypes,
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";

/* global Geolocation  */

// eslint-disable-next-line react/prefer-stateless-function
export default class LocationsMap extends PureComponent {
  render() {
    return (
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* add map markers here, as children of GoogleMap */}
        </GoogleMap>
      </div>
    );
  }
}

LocationsMap.defaultProps = {
  center: { lat: 32.789008, lng: -79.932115 },
  zoom: 16,
};

LocationsMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  googleMapsApiKey: PropTypes.string.isRequired,
};
