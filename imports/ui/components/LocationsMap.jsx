import React, {
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";

/* global Geolocation  */

type ILatLng = {
  // TODO  why does eslint show lat & lng as defined but not used?
  // TODO  correct eslint error, and remove eslint-disable-line
  lat: number,   // eslint-disable-line react/no-unused-prop-types
  lng: number,   // eslint-disable-line react/no-unused-prop-types
};

type ILocationsMapProps = {
  center?: ILatLng,
  zoom?: number,
  googleMapsApiKey: string,
  children?: React.Element,
};

// eslint-disable-next-line react/prefer-stateless-function
export default class LocationsMap extends PureComponent {
  static defaultProps: ILocationsMapProps = {
    center: { lat: 32.789008, lng: -79.932115 },
    zoom: 16,
  }

  props: ILocationsMapProps;

  render() {
    return (
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* add map markers here, as children of GoogleMap */}
          {this.props.children}
        </GoogleMap>
      </div>
    );
  }
}
