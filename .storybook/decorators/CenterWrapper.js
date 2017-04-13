import React, {
  PropTypes,
} from "react";
import classNames from "classnames";

import "!style!css!less!./CenterWrapper.css";

const CenterWrapper = (
  {
    width,
    height,
    background,
    hasBorder,
    horizontalCenter,
    verticalCenter,
    children,
    childrenBorder
  }
) => {
  const childrenClasses = classNames({
    childrenHorizontalCenter: horizontalCenter,
    childrenVerticalCenter: verticalCenter,
    childrenBorder: childrenBorder,
  });

  const centerStyle = {
    position: "fixed",
    right: 0,
    left: 0,
    marginRight: "auto",
    marginLeft: "auto",
    width: width,
    height: height,
    borderWidth: hasBorder ? "2px" : "",
    borderStyle: hasBorder ? "solid" : "",
    background: background,
    top: "50px",
  };

  return (
    <div style={centerStyle}>
      <div className={childrenClasses}>
        { children }
      </div>
    </div>
  );
};

CenterWrapper.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  hasBorder: PropTypes.bool,
  horizontalCenter: PropTypes.bool,
  verticalCenter: PropTypes.bool,
  children: PropTypes.node,
  childrenBorder: PropTypes.bool,
};

CenterWrapper.defaultProps = {
  width: "70%",
  height: "70%",
  background: "transparent",
  hasBorder: false,
  horizontalCenter: false,
  verticalCenter: false,
  childrenBorder: false,
};

export default CenterWrapper;