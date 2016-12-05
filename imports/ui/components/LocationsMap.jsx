import React, { PropTypes, PureComponent } from "react";
import GoogleMap from "google-map-react";

export default class LocationsMap extends PureComponent {
  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: "1px solid black",
    };

    return (
      <div style={mapStyle}>
        <GoogleMap
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
