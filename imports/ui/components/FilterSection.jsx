// @flow
import React, { Component } from "react";
import _ from "lodash";
import Pill from "./Pill";
import { Grid, Row, Col } from "./ReactBootstrapLib";
import type { IFilter } from "../../state/reducers/filtersReducers";

class FilterSection extends Component {
  props: {
    title: string,
    filters: Array<IFilter>,
    getFilters: (Array<string>) => void,
  };

  state = {
    // state will be populated with id's of each filter
  };

  componentDidUpdate() {
    const setFilters = [];
    _.forIn(this.state, (value, key) => {
      if (value) setFilters.push(key);
    });

    this.props.getFilters(setFilters);
  }

  handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // $FlowFixMe
    const { name } = event.currentTarget;

    this.setState({
      [name]: !this.state[name],
    });
  };

  render() {
    const { title, filters } = this.props;

    return (
      <Grid fluid>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <div className="filterSectionTitle">{title}</div>
            </Col>
          </Row>
          <Row>
            <Pill
              name={filters[0].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[0].id]}
            >
              {filters[0].name}
            </Pill>

            <Pill
              name={filters[1].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[1].id]}
            >
              {filters[1].name}
            </Pill>

            <Pill
              name={filters[2].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[2].id]}
            >
              {filters[2].name}
            </Pill>

            <Pill
              name={filters[3].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[3].id]}
            >
              {filters[3].name}
            </Pill>

            <Pill
              name={filters[4].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[4].id]}
            >
              {filters[4].name}
            </Pill>

            <Pill
              name={filters[5].id}
              onClick={this.handleButtonClick}
              active={this.state[filters[5].id]}
            >
              {filters[5].name}
            </Pill>
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default FilterSection;
