// @flow
import Alert from "react-s-alert";

// note, css required for this package is imported in 'importPackagesCss.js'

class AlertMessage extends Alert {
  props: {
    position?: string,
    offset?: number,
    stack?: boolean | { limit: number },
  };

  // customizing default props (slightly different than Alert)
  static defaultProps = {
    position: "top-left",
    offset: 70,
    stack: { limit: 5 },
  };
}

export default AlertMessage;
