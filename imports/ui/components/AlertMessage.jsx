// deliberately not flow checking this file (get working without it first!)
import React from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";

// note, css required for this package is imported in 'importPackagesCss.js'

const AlertMessage = props => (
  <Alert {...props} />
);

AlertMessage.propTypes = {
  position: PropTypes.string,
  offset: PropTypes.number,
};

AlertMessage.defaultProps = {
  position: "top-left",
  offset: 70,
};

// assign the Alert component methods to the functional component
AlertMessage.warning = Alert.warning;
AlertMessage.error = Alert.error;
AlertMessage.info = Alert.info;
AlertMessage.success = Alert.success;
AlertMessage.close = Alert.close;
AlertMessage.closeAll = Alert.closeAll;

export default AlertMessage;

