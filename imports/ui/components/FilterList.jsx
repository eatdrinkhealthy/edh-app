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
  handleToggleChange(event: Event) {
    const target = (event.target: window.HTMLInputElement);  // TODO issue #37
    console.log("checked:", target.id, target.checked);
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

export type IFilterListProps = {
  filterList?: IFilterList,
  setFilterHandler: () => void,
};

const FilterList = ({ filterList = [], setFilterHandler }: IFilterListProps) => (
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

export default FilterList;

export {
  FilterItem,
};
