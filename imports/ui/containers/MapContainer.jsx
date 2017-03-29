// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import { getNearbyPlaces } from "../../api/methods";
import type { IState } from "../../data/state/reducers/filters";
import type { IFilter } from "../../data/state/data/defaultFiltersTypes";

type IError = {
  // TODO define error type  (from a throw)
};

type ISearchResults = {
  // TODO define results type (parsed / formatted from foursquare api response)
};

export const getNearbyPlacesResponse = (error: IError, result: ISearchResults) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Method Response:", result);
    // TBD add business list (search results) to state? (displayed as markers on map)
  }
};

type IMapComponentProps = {
  filterList: Array<IFilter>,
};

export class MapComponent extends Component {
  componentWillMount() {
    // TODO refactor, issue #39 - move method call to appropriate location in container

    const selectedFilters = this.props.filterList.filter((filterItem: IFilter) => (filterItem.on));

    getNearbyPlaces.call({
      // latitude: 0,  // TODO remove hardcoded coordinates, get real location
      // longitude: 0,
      latitude: 32.789008,  // TODO remove hardcoded coordinates, get real location
      longitude: -79.932115,
      filterList: selectedFilters,
    }, getNearbyPlacesResponse);
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

const mapStateToProps = (state: IState): { filterList: Array<IFilter> } => ({
  filterList: state.filters,
});

const MapContainer = connect(mapStateToProps)(MapComponent);

export default MapContainer;
