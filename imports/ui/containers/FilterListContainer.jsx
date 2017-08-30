// @flow
import { connect } from "react-redux";
import { setFilter } from "../../state/actions/filtersActions";
import FilterList from "../components/FilterList";
import type { IState } from "../../state/stores/store";
import type { IFilter } from "../../state/reducers/filtersReducers";

const mapStateToProps = (state: IState): { filterList: Array<IFilter> } => ({
  filterList: state.filters,
});

type IDispatchFilterListProps = {
  setFilterHandler: (id: string, checked: boolean) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFilterListProps => ({
  setFilterHandler: (id: string, checked: boolean): void => (dispatch(setFilter(id, checked))),
});

const FilterListContainer = connect(mapStateToProps, mapDispatchToProps)(FilterList);

export default FilterListContainer;
