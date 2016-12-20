import React, {
  Component,
  PropTypes,
} from "react";
import { Link } from "react-router";

class Filter extends Component {
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
            <li>filter 1</li>
            <li>filter 2</li>
            <li>filter 3</li>
            <li>filter 4</li>
            <li>filter 5</li>
          </ul>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};
Filter.defaultProps = {};

export default Filter;
