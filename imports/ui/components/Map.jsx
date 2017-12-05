// @flow
import React, {
  PureComponent,
} from "react";
import GoogleMap from "google-map-react";
import Marker from "./Marker";
import Pin from "./Pin";

// eslint-disable-next-line no-duplicate-imports, import/first
import type { ILatLng, IGoogleMapDisplay } from "google-map-react";
import type { IVenue } from "../../state/reducers/searchResultsReducers";

function createMapOptions() {
  return {
    fullscreenControl: false,
  };
}

export type IViewArea = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

export default class Map extends PureComponent {
  props: {
    center: ILatLng,
    zoom?: number,
    userPosition?: ?ILatLng,   // eslint-disable-line react/require-default-props
    googleMapsApiKey: string,
    venues: Array<IVenue>,
    selectedVenueId: ?string,
    setSelectedVenueHandler: (venueId: ?string) => void,
    onMapChange?: (mapChange: ?IGoogleMapDisplay) => void,
  };

  static defaultProps = {
    zoom: 15,
    venues: [],
    onMapChange: (mapChange) => {}, // eslint-disable-line no-unused-vars
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
    const userPosition = this.props.userPosition;

    return (
      <div
        className="map-holder"
        ref={this.setMapHolderRef}
      >
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          center={this.props.center}
          zoom={this.props.zoom}
          onClick={this.handleOnClick}
          options={createMapOptions}
          onChange={this.props.onMapChange}
        >
          {userPosition && <Pin lat={userPosition.lat} lng={userPosition.lng} />}
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
