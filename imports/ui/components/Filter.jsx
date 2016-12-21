import React, {
  Component,
  PropTypes,
} from "react";
import { Link } from "react-router";
import { FilterList } from "../../api/filters";

class Filter extends Component {
  renderFilterItem(key, filter) {
    return (
      <div key={key}>
        <label htmlFor={key}>
          <input type="checkbox" id={key} />
          {filter.name}
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
          {Object.keys(FilterList).map(key => this.renderFilterItem(key, FilterList[key]))}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};
Filter.defaultProps = {};

export default Filter;
