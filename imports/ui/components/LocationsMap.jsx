// @flow
import React, {
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";
import Marker from "./Marker";

// eslint-disable-next-line no-duplicate-imports, import/first
import type { ILatLng } from "google-map-react";
import type { IVenue } from "../../state/reducers/searchResultsReducers";

export type IViewArea = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

export default class LocationsMap extends PureComponent {
  props: {
    center?: ILatLng,
    zoom?: number,
    googleMapsApiKey: string,
    venues: Array<IVenue>, // TODO can't this be optional with default? when so, produces flow error
    selectedVenueId: ?string,
    setSelectedVenueHandler: (venueId: ?string) => void,
  };

  static defaultProps = {
    center: { lat: 32.789008, lng: -79.932115 },
    zoom: 16,
    venues: [],
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(null);
  }

  mapHolder: HTMLDivElement;

  setMapHolderRef = (div: HTMLDivElement) => {
    this.mapHolder = div;
  }

  getHintViewArea = (): IViewArea => {
    const mhRect = this.mapHolder.getBoundingClientRect();

    const VIEW_AREA_HEADING_HEIGHT = 60;
    const VIEW_AREA_PADDING = 10;

    return {
      top: mhRect.top + VIEW_AREA_HEADING_HEIGHT + VIEW_AREA_PADDING,
      right: mhRect.right - VIEW_AREA_PADDING,
      bottom: mhRect.bottom - VIEW_AREA_PADDING,
      left: mhRect.left + VIEW_AREA_PADDING,
    };
  }

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div
        className="map-container"
        ref={this.setMapHolderRef}
      >
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.handleOnClick}
        >
          {this.props.venues.map((venue: IVenue): React$Element<*> => (
            <Marker
              key={venue.id}
              venue={venue}
              lat={venue.location.lat}
              lng={venue.location.lng}
              setSelectedVenueHandler={this.props.setSelectedVenueHandler}
              selected={venue.id === this.props.selectedVenueId}
              getHintViewArea={this.getHintViewArea}
            />))
          }
        </GoogleMap>
      </div>
    );
  }
}
