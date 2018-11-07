// @flow
import React, { Component } from "react";
import Pill from "./Pill";
import type { IEatDrinkFilter } from "../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../state/reducers/venueTypeFiltersReducers";

class FilterSection extends Component {
  props: {
    id: string,
    title: string,
    selectedColor?: string,
    filters: Array<IEatDrinkFilter | IVenueTypeFilter>,
    setFilter: (id: string) => void,
  };

  static defaultProps = {
    selectedColor: "#5e2ca5",
  };

  handlePillClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // $FlowFixMe
    const { name } = event.currentTarget;
    this.props.setFilter(name); // toggle current value of filter
  };

  render() {
    const { id, title, selectedColor, filters } = this.props;

    // for centering already styled components
    const divCenterContent = {
      textAlign: "center",
      padding: "0px 10px 0px 10px",
    };
    const pillContainer = {
      display: "inline-block",
    };

    return (
      <div id={id}>
        <div style={divCenterContent}>
          <span className="filterSectionTitle">{title}</span>
        </div>
        <div style={divCenterContent}>
          <span style={pillContainer}>
            <Pill
              name={filters[0].id}
              onClick={this.handlePillClick}
              active={filters[0].on}
              selectedColor={selectedColor}
            >
              {filters[0].name}
            </Pill>

            <Pill
              name={filters[1].id}
              onClick={this.handlePillClick}
              active={filters[1].on}
              selectedColor={selectedColor}
            >
              {filters[1].name}
            </Pill>

            <Pill
              name={filters[2].id}
              onClick={this.handlePillClick}
              active={filters[2].on}
              selectedColor={selectedColor}
            >
              {filters[2].name}
            </Pill>
          </span>
          <span style={pillContainer}>
            <Pill
              name={filters[3].id}
              onClick={this.handlePillClick}
              active={filters[3].on}
              selectedColor={selectedColor}
            >
              {filters[3].name}
            </Pill>

            <Pill
              name={filters[4].id}
              onClick={this.handlePillClick}
              active={filters[4].on}
              selectedColor={selectedColor}
            >
              {filters[4].name}
            </Pill>

            <Pill
              name={filters[5].id}
              onClick={this.handlePillClick}
              active={filters[5].on}
              selectedColor={selectedColor}
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
