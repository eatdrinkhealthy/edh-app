import React from "react";
import classNames from "classnames";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import ColBase from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";

export { Grid };
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
