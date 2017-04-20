// @flow
import React, {
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";
import Marker from "./Marker";

// eslint-disable-next-line no-duplicate-imports, import/first
import type { ILatLng } from "google-map-react";
import type { IFoursquareVenue } from "../../api/foursquare/foursquareApi";

type IProps = {
  center?: ILatLng,
  zoom?: number,
  googleMapsApiKey: string,
  venues: Array<IFoursquareVenue>, // TODO can't this be optional? (when so, produces flow error)
  selectedVenueId: ?string,
  setSelectedVenueHandler: (venueId: string) => void,
};

type IDefaultProps = {
  center: ILatLng,
  zoom: number,
  venues: Array<IFoursquareVenue>,
};

export default class LocationsMap extends PureComponent {
  static defaultProps: IDefaultProps = {
    center: { lat: 32.789008, lng: -79.932115 },
    zoom: 16,
    venues: [],
  }

  componentDidMount() {
    console.log("map container height:", this.mapContainer.clientHeight);
    console.log("map container width:", this.mapContainer.clientWidth);
  }

  mapContainer: HTMLDivElement;

  props: IProps;

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div
        className="map-container"
        ref={(div: HTMLDivElement) => { this.mapContainer = div; }}
      >
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.venues.map((venue: IFoursquareVenue): React$Element<*> => (
            <Marker
              key={venue.id}
              venueId={venue.id}
              lat={venue.location.lat}
              lng={venue.location.lng}
              setSelectedVenueHandler={this.props.setSelectedVenueHandler}
              selected={venue.id === this.props.selectedVenueId}
            />))
          }
        </GoogleMap>
      </div>
    );
  }
}
