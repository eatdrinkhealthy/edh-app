// deliberately not flow checking this file (get working without it first!)
import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

const AlertMessage = props => (
  <Alert {...props} />
);

AlertMessage.propTypes = {
  stack: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      limit: PropTypes.number,
      spacing: PropTypes.number,
    }),
  ]),
  position: PropTypes.string,
};

AlertMessage.defaultProps = {
  position: "top-right",
};

// assign the Alert component methods to the functional component
AlertMessage.warning = Alert.warning;
AlertMessage.error = Alert.error;
AlertMessage.info = Alert.info;
AlertMessage.success = Alert.success;
AlertMessage.close = Alert.close;
AlertMessage.closeAll = Alert.closeAll;

export default AlertMessage;

