import React, {
  Component,
  PropTypes,
} from "react";
import { Link } from "react-router";
import { Filters } from "../../api/filters";

class Filter extends Component {
  renderFilterItem(filterItem) {
    return (
      <div key={filterItem.value}>
        <label htmlFor={filterItem.value}>
          <input type="checkbox" id={filterItem.value} />
          {filterItem.name}
        </label>
      </div>
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
          {Filters.map(this.renderFilterItem)}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};
Filter.defaultProps = {};

export default Filter;
