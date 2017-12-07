// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import _ from "lodash";
import AlertMessage from "../components/AlertMessage";
import Map from "../components/Map";
import { setSearchResults } from "../../state/actions/searchResultsActions";
import {
  setSelectedVenue,
  setMapCenter,
  setMapZoom,
} from "../../state/actions/mapDisplayActions";

import type { IGoogleMapDisplay, ILatLng } from "google-map-react"; // eslint-disable-line import/first
import type { IVenue } from "../../state/reducers/searchResultsReducers";
import type { IState } from "../../state/stores/store";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

export type IMapWrapperProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
  searchResults: Array<IVenue>,
  setSearchResultsHandler: (searchResults: Array<IVenue>) => void,
  setSelectedVenueHandler: () => void,
  selectedVenueId: ?string,
  userLocation: ?ILatLng,
  mapCenter: ILatLng,
  setMapCenterHandler: (mapCenter: ILatLng) => void,
  zoom: number,
  setMapZoomHandler: (zoom: number) => void,
};

export class MapWrapper extends Component {
  props: IMapWrapperProps;

  componentWillReceiveProps(nextProps: IMapWrapperProps) {
    if (this.filterHasChanged(nextProps)) {
      this.callFoursquareApi(
        nextProps.eatDrinkFilters,
        nextProps.venueTypeFilters,
        nextProps.mapCenter,
      );
    }
  }

  callFoursquareApi = (
    eatDrinkFilters: Array<IEatDrinkFilter>,
    venueTypeFilters: Array<IVenueTypeFilter>,
    mapCenter: ILatLng,
  ) => {
    const selectedEatDrinkFilters = eatDrinkFilters.filter(
      (filterItem: IEatDrinkFilter): boolean => (filterItem.on),
    );

    const selectedVenueTypeFilters = venueTypeFilters.filter(
      (filterItem: IVenueTypeFilter): boolean => (filterItem.on),
    );

    Meteor.call("getNearbyPlaces",
      {
        latitude: mapCenter.lat,
        longitude: mapCenter.lng,
        eatDrinkFilters: selectedEatDrinkFilters,
        venueTypeFilters: selectedVenueTypeFilters,
      },
      this.getNearbyPlacesCB,
    );
  };

  filterHasChanged = (nextProps: IMapWrapperProps): boolean => {
    const edfChanged = !_.isEqual(this.props.eatDrinkFilters, nextProps.eatDrinkFilters);
    const vtfChanged = !_.isEqual(this.props.venueTypeFilters, nextProps.venueTypeFilters);
    const mapChanged = !_.isEqual(this.props.mapCenter, nextProps.mapCenter);

    return edfChanged || vtfChanged || mapChanged;
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
    // TODO conditionally call these handlers (if center or zoom have changed)
    this.props.setMapCenterHandler({
      lat: mapChange.center.lat,
      lng: mapChange.center.lng,
    });

    this.props.setMapZoomHandler(mapChange.zoom);
  };

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <Map
        center={this.props.mapCenter}
        zoom={this.props.zoom}
        userLocation={this.props.userLocation}
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
  userLocation: ?ILatLng,
  mapCenter: ILatLng,
  zoom: number,
};

const mapStateToProps = (state: IState): IStateProps => ({
  eatDrinkFilters: state.eatDrinkFilters,
  venueTypeFilters: state.venueTypeFilters,
  searchResults: state.searchResults,
  selectedVenueId: state.mapDisplay.selectedVenueId,
  userLocation: state.mapDisplay.userLocation,
  mapCenter: state.mapDisplay.mapCenter,
  zoom: state.mapDisplay.zoom,
});

type IDispatchProps = {
  setSearchResultsHandler: (searchResults: Array<IVenue>) => void,
  setSelectedVenueHandler: (venueId: string) => void,
  setMapCenterHandler: (mapCenter: ILatLng) => void,
  setMapZoomHandler: (zoom: number) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setSearchResultsHandler: (searchResults: Array<IVenue>): void => (
    dispatch(setSearchResults(searchResults))
  ),
  setSelectedVenueHandler: (venueId: ?string): void => (
    dispatch(setSelectedVenue(venueId))
  ),
  setMapCenterHandler: (mapCenter: ILatLng): void => (
    dispatch(setMapCenter(mapCenter))
  ),
  setMapZoomHandler: (zoom: number): void => (
    dispatch(setMapZoom(zoom))
  ),
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(MapWrapper);

export default MapContainer;
