// @flow
import React, { Component } from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";
import type { IFilter } from "../../data/state/data/defaultFilters";

type IFilterItemProps = {
  label: string,
  filterId: string,
  filterOn: boolean,
  setFilterHandler: (id: string, checked: boolean) => void,
};

export class FilterItem extends Component {
  handleToggleChange(event: Event) {
    const target = (event.target: window.HTMLInputElement);  // TODO issue #37
    this.props.setFilterHandler(target.id, target.checked);
  }

  props: IFilterItemProps;

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <div>
        <span className="react-toggle-label">{this.props.label}</span>
        <span className="react-toggle">
          <Toggle
            id={this.props.filterId}
            checked={this.props.filterOn}
            onChange={(event: Event): void => this.handleToggleChange(event)}
          />
        </span>
      </div>
    );
  }
}

export type IFilterListProps = {
  filterList?: Array<IFilter>,
  setFilterHandler: () => void,
};

const FilterList = (
  { filterList = [], setFilterHandler }: IFilterListProps,
): React$Element<*> => (
  <div>
    <div className="filter-header">
      <h4>Filter</h4>
      <Link to="/">
        <div className="close-filter toggle-filter" />
      </Link>
    </div>
    <div className="filter">
      {filterList.map((filter: IFilter): React.Element<*> =>
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
