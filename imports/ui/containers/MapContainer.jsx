// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import _ from "lodash";
import AlertMessage from "../components/AlertMessage";
import Map from "../components/Map";
import { getLocation } from "../../utils/geoLocation";
import { setSearchResults } from "../../state/actions/searchResultsActions";
import { setSelectedVenue } from "../../state/actions/mapDisplayActions";

import type { IGoogleMapDisplay, ILatLng } from "google-map-react"; // eslint-disable-line import/first
import type { IVenue } from "../../state/reducers/searchResultsReducers";
import type { IState } from "../../state/stores/store";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

type IMapWrapperProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
  searchResults: Array<IVenue>,
  setSearchResultsHandler: (searchResults: Array<IVenue>) => void,
  setSelectedVenueHandler: () => void,
  selectedVenueId: ?string,
};

type IMapWrapperState = {
  center: ILatLng,
  userLocation?: ILatLng,
  zoom: number,
};

export class MapWrapper extends Component {
  props: IMapWrapperProps;

  state: IMapWrapperState = {
    center: {
      lat: 32.789008,
      lng: -79.932115,
    },
    zoom: 3,
  };

  componentDidMount() {
    getLocation((position: Position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 15,
      });
    });
  }

  componentWillReceiveProps(nextProps: IMapWrapperProps) {
    if (this.filterHasChanged(nextProps)) {
      this.callFoursquareApi(nextProps.eatDrinkFilters, nextProps.venueTypeFilters);
    }
  }

  callFoursquareApi = (
    eatDrinkFilters: Array<IEatDrinkFilter>,
    venueTypeFilters: Array<IVenueTypeFilter>,
  ) => {
    const selectedEatDrinkFilters = eatDrinkFilters.filter(
      (filterItem: IEatDrinkFilter): boolean => (filterItem.on),
    );

    const selectedVenueTypeFilters = venueTypeFilters.filter(
      (filterItem: IVenueTypeFilter): boolean => (filterItem.on),
    );

    Meteor.call("getNearbyPlaces",
      {
        latitude: this.state.center.lat,
        longitude: this.state.center.lng,
        eatDrinkFilters: selectedEatDrinkFilters,
        venueTypeFilters: selectedVenueTypeFilters,
      },
      this.getNearbyPlacesCB,
    );
  };

  filterHasChanged = (nextProps: IMapWrapperProps): boolean => {
    const edfChanged = !_.isEqual(this.props.eatDrinkFilters, nextProps.eatDrinkFilters);
    const vtfChanged = !_.isEqual(this.props.venueTypeFilters, nextProps.venueTypeFilters);

    return edfChanged || vtfChanged;
  };

  // NOTE: this is an ES6 class property arrow function (preserves this context)
  getNearbyPlacesCB = (error: Error, result: Array<IVenue>) => {
    if (error) {
      AlertMessage.warning("Unable to search at this time...");
      // TODO potentially throw here (or confirm an exception is thrown by server)
    } else {
      if (!result.length) {
        // TODO consider only storing selected filters in state (instead of all
        //      filters) starting to repeat code to get which filters are selected
        const selectedEdFilters = this.props.eatDrinkFilters.filter(
          (filterItem: IEatDrinkFilter): boolean => (filterItem.on),
        );

        const selectedVtFilters = this.props.venueTypeFilters.filter(
          (filterItem: IVenueTypeFilter): boolean => (filterItem.on),
        );

        if (selectedEdFilters.length || selectedVtFilters.length) {
          AlertMessage.warning("No search results for current criteria...");
        }
      }
      // TODO potentially throw here (or log search criteria to a logger for evaluation)
      this.props.setSearchResultsHandler(result);
    }
  };

  handleMapChange = (mapChange: IGoogleMapDisplay) => {
    this.setState({
      center: {
        lat: mapChange.center.lat,
        lng: mapChange.center.lng,
      },
    });
  };

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <Map
        center={this.state.center}
        zoom={this.state.zoom}
        userLocation={this.state.userLocation}
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={this.props.searchResults}
        setSelectedVenueHandler={this.props.setSelectedVenueHandler}
        selectedVenueId={this.props.selectedVenueId}
        onMapChange={this.handleMapChange}
      />
    );
  }
}

type IStateProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
  searchResults: Array<IVenue>,
  selectedVenueId: ?string,
};

const mapStateToProps = (state: IState): IStateProps => ({
  eatDrinkFilters: state.eatDrinkFilters,
  venueTypeFilters: state.venueTypeFilters,
  searchResults: state.searchResults,
  selectedVenueId: state.mapDisplay.selectedVenueId,
});

type IDispatchProps = {
  setSearchResultsHandler: (searchResults: Array<IVenue>) => void,
  setSelectedVenueHandler: (venueId: string) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setSearchResultsHandler: (searchResults: Array<IVenue>): void => (
    dispatch(setSearchResults(searchResults))
  ),
  setSelectedVenueHandler: (venueId: ?string): void => (
    dispatch(setSelectedVenue(venueId))
  ),
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(MapWrapper);

export default MapContainer;
