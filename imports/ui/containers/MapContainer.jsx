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
import type { IFilterList } from "../../data/state/data/defaultFiltersTypes";

type IMapComponentProps = {
  filterList: IFilterList,
};

export const processMethodResponse = (err, res) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Method Response:", res);
    // TBD add business list (search results) to state? (displayed as markers on map)
  }
};

export class MapComponent extends Component {
  componentWillMount() {
    // TODO refactor, issue #39 - move method call to appropriate location in container

    const selectedFilters = this.props.filterList.filter(filterItem => (filterItem.on));

    getNearbyPlaces.call({
      latitude: 0,
      longitude: 0,
      filterList: selectedFilters,
    }, processMethodResponse);
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

const mapStateToProps = (state: IState): { filterList: IFilterList } => ({
  filterList: state.filters,
});

const MapContainer = connect(mapStateToProps)(MapComponent);

export default MapContainer;
