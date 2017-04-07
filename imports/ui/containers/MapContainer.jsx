// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import { getNearbyPlaces } from "../../api/methods";
import { setSearchResults } from "../../data/state/actions/actionCreators";

import type { IFoursquareVenue } from "../../api/foursquare/foursquareApi";
import type { IState } from "../../data/state/reducers";
import type { IFilter } from "../../data/state/data/defaultFilters";

type IMapComponentProps = {
  filterList: Array<IFilter>,
  searchResults: Array<IFoursquareVenue>,
  setSearchResultsHandler: () => void,
};

export class MapComponent extends Component {
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

  getNearbyPlacesCB(error: Error, result: Array<IFoursquareVenue>) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Method Response:", result);
    }
  }

  props: IMapComponentProps;

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <div>
        <Navbar />
        <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
      </div>
    );
  }
}

type IStateProps = {
  filterList: Array<IFilter>,
  searchResults: Array<IFoursquareVenue>,
};

const mapStateToProps = (state: IState): IStateProps => ({
  filterList: state.filters,
  searchResults: state.searchResults,
});

type IDispatchSetSearchResultsProps = {
  setSearchResultsHandler: (searchResults: Array<IFoursquareVenue>) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchSetSearchResultsProps => ({
  setSearchResultsHandler: (searchResults: Array<IFoursquareVenue>): void => (
    dispatch(setSearchResults(searchResults))
  ),
});

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default MapContainer;
