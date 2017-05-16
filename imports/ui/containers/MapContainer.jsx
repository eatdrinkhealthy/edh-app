// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import { getNearbyPlaces } from "../../api/methods";
import { setSearchResults } from "../../data/state/actions/searchResultsActions";
import { setSelectedVenue } from "../../data/state/actions/mapDisplayActions";

import type { IVenue } from "../../data/state/reducers/searchResultsReducers";
import type { IState } from "../../data/state/stores/store";
import type { IFilter } from "../../data/state/data/defaultFilters";

type IMapComponentProps = {
  filterList: Array<IFilter>,
  searchResults: Array<IVenue>,
  setSearchResultsHandler: () => void,
  setSelectedVenueHandler: () => void,
  selectedVenueId: ?string,
};

export class MapComponent extends Component {
  props: IMapComponentProps;

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
      console.log("Error:", error);
    } else {
      this.props.setSearchResultsHandler(result);
    }
  }

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <div>
        <Navbar />
        <LocationsMap
          googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
          venues={this.props.searchResults}
          setSelectedVenueHandler={this.props.setSelectedVenueHandler}
          selectedVenueId={this.props.selectedVenueId}
        />
      </div>
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
  setSelectedVenueHandler: (venueId: string): void => (
    dispatch(setSelectedVenue(venueId))
  ),
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default MapContainer;
