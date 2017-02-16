import React, {
  PropTypes,
} from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";

const FilterItem = ({ filter }) => (
  <div>
    <span className="react-toggle-label">{filter.name}</span>
    <span className="react-toggle"> <Toggle id={filter.id} /></span>
  </div>
);

FilterItem.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const Filter = ({ filterList = [] }) => (
  <div>
    <div className="filter-header">
      <h4>Filter</h4>
      <Link to="/">
        <div className="close-filter toggle-filter" />
      </Link>
    </div>
    <div className="filter">
      {filterList.map(filter => (
        <FilterItem key={filter.id} filter={filter} />))
      }
    </div>
  </div>
);

Filter.propTypes = {
  filterList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default Filter;

export {
  FilterItem,
};
