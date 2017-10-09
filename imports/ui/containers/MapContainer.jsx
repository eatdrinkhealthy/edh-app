// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import AlertMessage from "../components/AlertMessage";
import Map from "../components/Map";
import { getNearbyPlaces } from "../../api/foursquare/methods";
import { setSearchResults } from "../../state/actions/searchResultsActions";
import { setSelectedVenue } from "../../state/actions/mapDisplayActions";

import type { IVenue } from "../../state/reducers/searchResultsReducers";
import type { IState } from "../../state/stores/store";
import type { IFilter } from "../../state/reducers/filtersReducers";

export class MapWrapper extends Component {
  props: {
    filterList: Array<IFilter>,
    searchResults: Array<IVenue>,
    setSearchResultsHandler: (searchResults: Array<IVenue>) => void,
    setSelectedVenueHandler: () => void,
    selectedVenueId: ?string,
  };

  componentWillMount() {
    const selectedFilters = this.props.filterList.filter(
      (filterItem: IFilter): boolean => (filterItem.on),
    );

    getNearbyPlaces.call({
      latitude: 32.789008,     // TODO remove hardcoded coordinates, get real location
      longitude: -79.932115,
      filterList: selectedFilters,
    }, this.getNearbyPlacesCB);
  }

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
  filterList: Array<IFilter>,
  searchResults: Array<IVenue>,
  selectedVenueId: ?string,
};

const mapStateToProps = (state: IState): IStateProps => ({
  filterList: state.filters,
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
