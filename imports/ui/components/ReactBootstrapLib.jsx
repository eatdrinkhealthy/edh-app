// NO Flow (primarily to avoid making libdefs for each react-bootstrap component lib)
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import GridBase from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import ColBase from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";

export { Row };
export { Button };
export { ToggleButton };
export { ToggleButtonGroup };

// This HOC takes a component, and will add the additional passed in class
// to className, if the global variable SHOW_GRID is set.
const showGridHOC = (
  WrappedComponent,
  gridClass,
) => {
  const GridHOC = (props) => {
    const { className, ...otherProps } = props;
    const allClasses = classNames(className, { [gridClass]: window.SHOW_GRID });

    return (
      <WrappedComponent
        {...otherProps}
        className={allClasses}
      />
    );
  };

  GridHOC.propTypes = {
    className: PropTypes.string,
  };

  GridHOC.displayName =
    `HOC(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return GridHOC;
};

export const Col = showGridHOC(ColBase, "show-grid");

export const Grid = showGridHOC(GridBase, "show-breakpoint");
