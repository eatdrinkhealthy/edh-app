// @flow
import { connect } from "react-redux";
import toggleFilter from "../../data/state/actions/actionCreators";
import Filter from "../components/Filter";
import type { IState } from "../../data/state/reducers/filters";

const mapStateToProps = (state: IState) => ({
  filterList: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setFilterHandler: (id: string) => (dispatch(toggleFilter(id))),
});

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
