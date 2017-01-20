import React, {
  Component,
  PropTypes,
} from "react";
import { Link } from "react-router";
import Toggle from "react-toggle";

class Filter extends Component {
  renderFilterItem(key, name) {
    // TODO improve layout (more proper CSS)
    return (
      <div key={key}>
        <span className="react-toggle-label">{name}</span>
        <span className="react-toggle"> <Toggle id={key} /></span>
      </div>
    );
  }

  render() {
    const filterList = this.props.filterList || {};

    return (
      <div>
        <div className="filter-header">
          <h4>Filter</h4>
          <Link to="/">
            <div className="close-filter toggle-filter" />
          </Link>
        </div>
        <div className="filter">
          {Object.keys(filterList).map(key => this.renderFilterItem(key, filterList[key].name))}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  filterList: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

export default Filter;
