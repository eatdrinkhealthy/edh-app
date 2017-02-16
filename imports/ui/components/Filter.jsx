// @flow
import React, {
  PropTypes,
} from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";

type IFilterItem = {
  label: string,
  filterId: string,
};

const FilterItem = ({ label, filterId }: IFilterItem) => (
  <div>
    <span className="react-toggle-label">{label}</span>
    <span className="react-toggle"> <Toggle id={filterId} /></span>
  </div>
);

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
        <FilterItem key={filter.id} label={filter.name} filterId={filter.id} />))
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
