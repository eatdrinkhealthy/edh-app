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

export const Col = (props) => {
  const { className, children, ...otherProps } = props;
  const allClasses = classNames(
    className,
    window.SHOW_GRID ? "show-grid" : "",
  );

  return (
    <ColBase
      {...otherProps}
      className={allClasses}
    >
      {children}
    </ColBase>
  );
};

Col.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const Grid = (props) => {
  const { className, children, ...otherProps } = props;
  const allClasses = classNames(
    className,
    window.SHOW_GRID ? "show-breakpoint" : "",
  );

  return (
    <GridBase
      {...otherProps}
      className={allClasses}
    >
      {children}
    </GridBase>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
