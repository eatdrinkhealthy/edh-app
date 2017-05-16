// @flow
import React, {
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";
import Marker from "./Marker";

// eslint-disable-next-line no-duplicate-imports, import/first
import type { ILatLng } from "google-map-react";
import type { IVenue } from "../../data/state/reducers/searchResultsReducers";

type IProps = {
  center?: ILatLng,
  zoom?: number,
  googleMapsApiKey: string,
  venues: Array<IVenue>, // TODO can't this be optional? (when so, produces flow error)
  selectedVenueId: ?string,
  setSelectedVenueHandler: (venueId: string) => void,
};

type IDefaultProps = {
  center: ILatLng,
  zoom: number,
  venues: Array<IVenue>,
};

export default class LocationsMap extends PureComponent {
  props: IProps;

  mapContainer: HTMLDivElement;

  static defaultProps: IDefaultProps = {
    center: { lat: 32.789008, lng: -79.932115 },
    zoom: 16,
    venues: [],
  }

  componentDidMount() {
    console.log("map container height:", this.mapContainer.clientHeight);
    console.log("map container width:", this.mapContainer.clientWidth);
  }

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
          {this.props.venues.map((venue: IVenue): React$Element<*> => (
            <Marker
              key={venue.id}
              venue={venue}
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
