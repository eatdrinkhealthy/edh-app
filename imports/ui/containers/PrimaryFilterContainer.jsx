// @flow
import { connect } from "react-redux";
import { toggleEatDrinkFilter } from "../../state/actions/eatDrinkFiltersActions";
import { toggleVenueTypeFilter } from "../../state/actions/venueTypeFiltersActions";
import PrimaryFilter from "../components/PrimaryFilter";
import type { IState } from "../../state/stores/store";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

type IStatePrimaryFilterProps = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
};

const mapStateToProps = (state: IState): IStatePrimaryFilterProps => ({
  eatDrinkFilters: state.eatDrinkFilters,
  venueTypeFilters: state.venueTypeFilters,
});

type IDispatchPrimaryFilterProps = {
  toggleEatDrinkFilterHandler: (id: string) => void,
  toggleVenueTypeFilterHandler: (id: string) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchPrimaryFilterProps => ({
  toggleEatDrinkFilterHandler: id => dispatch(toggleEatDrinkFilter(id)),
  toggleVenueTypeFilterHandler: id => dispatch(toggleVenueTypeFilter(id)),
});

const PrimaryFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryFilter);

export default PrimaryFilterContainer;
