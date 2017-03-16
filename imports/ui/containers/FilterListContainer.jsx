// TODO  add flow type checking
import { connect } from "react-redux";
import toggleFilter from "../../data/state/actions/actionCreators";
import FilterList from "../components/FilterList";
import type { IState } from "../../data/state/reducers/filters";

const mapStateToProps = (state: IState) => ({
  filterList: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setFilterHandler: (id: string) => (dispatch(toggleFilter(id))),
});

const FilterListContainer = connect(mapStateToProps, mapDispatchToProps)(FilterList);

export default FilterListContainer;
