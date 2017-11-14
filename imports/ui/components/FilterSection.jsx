// @flow
import React, { Component } from "react";
import Pill from "./Pill";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

class FilterSection extends Component {
  props: {
    title: string,
    filters: Array<IEatDrinkFilter | IVenueTypeFilter>,
    setFilter: (id: string) => void,
  };

  handlePillClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // $FlowFixMe
    const { name } = event.currentTarget;
    this.props.setFilter(name);           // toggle current value of filter
  };

  render() {
    const { title, filters } = this.props;

    // for centering already styled components
    const divCenterContent = {
      textAlign: "center",
      padding: "0px 10px 0px 10px",
    };
    const pillContainer = {
      display: "inline-block",
    };

    return (
      <div>
        <div style={divCenterContent}>
          <span className="filterSectionTitle">{title}</span>
        </div>
        <div style={divCenterContent}>
          <span style={pillContainer}>
            <Pill
              name={filters[0].id}
              onClick={this.handlePillClick}
              active={filters[0].on}
            >
              {filters[0].name}
            </Pill>

            <Pill
              name={filters[1].id}
              onClick={this.handlePillClick}
              active={filters[1].on}
            >
              {filters[1].name}
            </Pill>

            <Pill
              name={filters[2].id}
              onClick={this.handlePillClick}
              active={filters[2].on}
            >
              {filters[2].name}
            </Pill>
          </span>
          <span style={pillContainer}>
            <Pill
              name={filters[3].id}
              onClick={this.handlePillClick}
              active={filters[3].on}
            >
              {filters[3].name}
            </Pill>

            <Pill
              name={filters[4].id}
              onClick={this.handlePillClick}
              active={filters[4].on}
            >
              {filters[4].name}
            </Pill>

            <Pill
              name={filters[5].id}
              onClick={this.handlePillClick}
              active={filters[5].on}
            >
              {filters[5].name}
            </Pill>
          </span>
        </div>
      </div>
    );
  }
}

export default FilterSection;
