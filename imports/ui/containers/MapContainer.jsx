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
import { setSelectedVenue } from "../../state/actions/mapDisplayActions";

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

export class MapWrapper extends Component {
  props: IMapWrapperProps;

  componentWillReceiveProps(nextProps: IMapWrapperProps) {
    if (this.filterHasChanged(nextProps)) {
      const eatDrinkFilters = nextProps.eatDrinkFilters.filter(
        (filterItem: IEatDrinkFilter): boolean => (filterItem.on),
      );

      Meteor.call("getNearbyPlaces",
        {
          latitude: 32.789008,     // TODO remove hardcoded coordinates, get real location
          longitude: -79.932115,
          eatDrinkFilters,
        },
        this.getNearbyPlacesCB,
      );
    }
  }

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
        AlertMessage.warning("No search results for current criteria...");
      }
      // TODO potentially throw here (or log search criteria to a logger for evaluation)
      this.props.setSearchResultsHandler(result);
    }
  };

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <Map
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={this.props.searchResults}
        setSelectedVenueHandler={this.props.setSelectedVenueHandler}
        selectedVenueId={this.props.selectedVenueId}
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
