// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";

type IMarkerOrigin =
  | "center"
  | "topLeft";

type IMarkerProps = {
  label?: string,
  origin?: IMarkerOrigin,
};

// eslint-disable-next-line react/prefer-stateless-function
class Marker extends PureComponent {
  // TODO - confirm that when an optional prop is not provided, and if a default value is not
  //        provided, no ill side effects occur (ie it is okay to try to render an undefined prop)
  //        (should defaultProps be set here?  -note, tests don't fail when label isn't provided)
  props: IMarkerProps;

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerClass = classNames("markerStyle", {
      markerCenterOrigin: this.props.origin === "center",
      markerCenterTopLeft: this.props.origin === "topLeft",
    });

    return (
      <div className={markerClass}>
        {this.props.label}
      </div>
    );
  }
}

export default Marker;
