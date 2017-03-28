// @flow
import React, {
  Component,
} from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
// import getNearbyPlaces from "../../api/methods";
import type { IState } from "../../data/state/reducers/filters";
import type { IFilterList } from "../../data/state/data/defaultFiltersTypes";

export class MapComponent extends Component {
  componentWillMount() {
    // call nearbyPlaces method (send filter list)
    // getNearbyPlaces.call({
    //   latitude: 0,
    //   longitude: 0,
    //   filterList:
    // })
  }

  render() { // eslint-disable-line flowtype/require-return-type
    return (
      <div>
        <Navbar />
        <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState): { filterList: IFilterList } => ({
  filterList: state.filters,
});

const MapContainer = connect(mapStateToProps)(MapComponent);

export default MapContainer;
