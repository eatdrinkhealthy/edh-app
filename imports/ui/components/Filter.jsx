// @flow
import React from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";

type IFilterItemProps = {
  label: string,
  filterId: string,
};

const FilterItem = ({ label, filterId }: IFilterItemProps) => (
  <div>
    <span className="react-toggle-label">{label}</span>
    <span className="react-toggle"> <Toggle id={filterId} /></span>
  </div>
);

type IFilter = {
  name: string,  // eslint-disable-line react/no-unused-prop-types
  id: string,    // eslint-disable-line react/no-unused-prop-types
};

type IFilterProps = {
  filterList?: IFilter[],
};

const Filter = ({ filterList = [] }: IFilterProps) => (
  <div>
    <div className="filter-header">
      <h4>Filter</h4>
      <Link to="/">
        <div className="close-filter toggle-filter" />
      </Link>
    </div>
    <div className="filter">
      {filterList.map((filter: IFilter) =>
        (<FilterItem
          key={filter.id}
          label={filter.name}
          filterId={filter.id}
        />))}
    </div>
  </div>
);

export default Filter;

export {
  FilterItem,
};
