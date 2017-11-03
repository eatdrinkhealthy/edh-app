// @flow
import { connect } from "react-redux";
import { toggleEatDrinkFilter } from "../../state/actions/eatDrinkFiltersActions";
import PrimaryFilter from "../components/PrimaryFilter";
import type { IState } from "../../state/stores/store";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";

const mapStateToProps = (state: IState): { eatDrinkFilters: Array<IEatDrinkFilter>} => ({
  eatDrinkFilters: state.eatDrinkFilters,
});

type IDispatchEatDrinkFilterProps = {
  toggleEatDrinkFilterHandler: (id: string) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchEatDrinkFilterProps => ({
  toggleEatDrinkFilterHandler: id => (dispatch(toggleEatDrinkFilter(id))),
});

const PrimaryFilterContainer = connect(mapStateToProps, mapDispatchToProps)(PrimaryFilter);

export default PrimaryFilterContainer;
