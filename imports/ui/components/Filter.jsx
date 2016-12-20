import React, {
  Component,
  PropTypes,
} from "react";
import { Link } from "react-router";
import { Filters } from "../../api/filters";

class Filter extends Component {
  renderFilter(filterItem) {

    return (
      <li>{filterItem.name}</li>
    );
  }

  render() {
    return (
      <div>
        <div className="filter-header">
          <h4>Filter</h4>
          <Link to="/">
            <div className="close-filter toggle-filter" />
          </Link>
        </div>
        <div className="filter">
          <ul>
            {Filters.map(this.renderFilter)}
          </ul>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};
Filter.defaultProps = {};

export default Filter;
