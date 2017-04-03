// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import { getNearbyPlaces } from "../../api/methods";

import type { IFoursquareVenue } from "../../api/foursquare/foursquareApi";
import type { IState } from "../../data/state/reducers/filters";
import type { IFilter } from "../../data/state/data/defaultFiltersTypes";

export const getNearbyPlacesCB = (error: Error, result: Array<IFoursquareVenue>) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Method Response:", result);
  }
};

// TODO refactor, issue #39 - move method call to appropriate location in container
//       (note, it is a top level function though for ease of testing)
export const getNearbyPlacesMethod = (
  lat: number,
  lng: number,
  selectedFilters: Array<IFilter>,
) => {
  getNearbyPlaces.call({
    latitude: lat,
    longitude: lng,
    filterList: selectedFilters,
  }, getNearbyPlacesCB);
};

type IMapComponentProps = {
  filterList: Array<IFilter>,
};

export class MapComponent extends Component {
  componentWillMount() {
    const selectedFilters = this.props.filterList.filter(
      (filterItem: IFilter): boolean => (filterItem.on),
    );
    // TODO remove hardcoded coordinates, get real location
    getNearbyPlacesMethod(32.789008, -79.932115, selectedFilters);
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
