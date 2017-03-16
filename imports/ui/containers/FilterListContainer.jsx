// @flow
// TODO  add flow type checking
import { connect } from "react-redux";
import { setFilter } from "../../data/state/actions/actionCreators";
import FilterList from "../components/FilterList";
import type { IState } from "../../data/state/reducers/filters";
import type { IFilterList } from "../../data/state/data/defaultFiltersTypes";

const mapStateToProps = (state: IState): { filterList: IFilterList } => ({
  filterList: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setFilterHandler: (id: string, checked: boolean) => (dispatch(setFilter(id, checked))),
});

const FilterListContainer = connect(mapStateToProps, mapDispatchToProps)(FilterList);

export default FilterListContainer;
