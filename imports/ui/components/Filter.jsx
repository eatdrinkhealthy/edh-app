// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";
import type { IFilter, IFilterList } from "../../data/state/data/defaultFiltersTypes";

type IFilterItemProps = {
  label: string,
  filterId: string,
  filterOn: boolean,
  setFilterHandler: () => void,
};

class FilterItem extends Component {
  handleToggleChange(event) {
    console.log("checked:", event.target.id, event.target.checked);
    // this.props.setFilterHandler("abc");
  }

  props: IFilterItemProps;

  render() {
    return (
      <div>
        <span className="react-toggle-label">{this.props.label}</span>
        <span className="react-toggle">
          <Toggle
            id={this.props.filterId}
            checked={this.props.filterOn}
            onChange={this.handleToggleChange}
          />
        </span>
      </div>
    );
  }
}

type IFilterProps = {
  filterList?: IFilterList,
  setFilterHandler: () => void,
};

const Filter = ({ filterList = [], setFilterHandler }: IFilterProps) => (
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
          filterOn={filter.on}
          setFilterHandler={setFilterHandler}
        />))}
    </div>
  </div>
);

export default Filter;

export {
  FilterItem,
};
