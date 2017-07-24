// deliberately not flow checking this file (get working without it first!)
import PropTypes from "prop-types";
import Alert from "react-s-alert";

// note, css required for this package is imported in 'importPackagesCss.js'

class AlertMessage extends Alert {}

AlertMessage.propTypes = {
  position: PropTypes.string,
  offset: PropTypes.number,
};

// customizing default props (slightly different than Alert)
AlertMessage.defaultProps = {
  position: "top-left",
  offset: 70,
};

export default AlertMessage;

