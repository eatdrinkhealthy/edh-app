// @flow
import { connect } from "react-redux";
import Filter from "../components/Filter";
import type { IState } from "../../data/state/reducers/filters";

const mapStateToProps = (state: IState) => ({
  filterList: state.filters,
});

const FilterContainer = connect(mapStateToProps)(Filter);

export default FilterContainer;
