// @flow
import { connect } from "react-redux";
import { setFilter } from "../../data/state/actions/actionCreators";
import FilterList from "../components/FilterList";
import type { IState } from "../../data/state/reducers/filters";
import type { IFilterList } from "../../data/state/data/defaultFiltersTypes";

type IStateFilterListProps = {
  filterList: IFilterList,
};

const mapStateToProps = (state: IState): IStateFilterListProps => ({
  filterList: state.filters,
});

type IDispatchFilterListProps = {
  setFilterHandler: (id: string, checked: boolean) => void,
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFilterListProps => ({
  setFilterHandler: (id: string, checked: boolean) => (dispatch(setFilter(id, checked))),
});

const FilterListContainer = connect(mapStateToProps, mapDispatchToProps)(FilterList);

export default FilterListContainer;
