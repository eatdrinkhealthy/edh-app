import React, {
  PropTypes,
} from "react";
import classNames from "classnames";

import "!style!css!less!./CenterWrapper.css";

const CenterWrapper = ({ horizontalCenter, border, children }) => {
  const childrenClasses = classNames({
    childrenCenter: horizontalCenter,
    childrenBorder: border,
  });

  return (<div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">
      <div className={childrenClasses}>
        { children }
      </div>
    </div>
  </div>);
  };

CenterWrapper.propTypes = {
  horizontalCenter: PropTypes.bool,
  border: PropTypes.bool,
};

CenterWrapper.defaultProps = {
  horizontalCenter: false,
  border: false,
};

export default CenterWrapper;