import React, {
  PropTypes,
} from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";


const FilterItem = ({ filterKey, name }) => (
  <div>
    <span className="react-toggle-label">{name}</span>
    <span className="react-toggle"> <Toggle id={filterKey} /></span>
  </div>
);

FilterItem.propTypes = {
  filterKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Filter = ({ filterList = {} }) => (
  <div>
    <div className="filter-header">
      <h4>Filter</h4>
      <Link to="/">
        <div className="close-filter toggle-filter" />
      </Link>
    </div>
    <div className="filter">
      {Object.keys(filterList).map(filterKey => (
        <FilterItem key={filterKey} filterKey={filterKey} name={filterList[filterKey].name} />)
      )}
    </div>
  </div>
);

Filter.propTypes = {
  filterList: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

export default Filter;

export {
  FilterItem,
};
