// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";

type IMarkerOrigin =
  | "center"
  | "topLeft"
  | "bottomCenter";

type IMarkerProps = {
  label?: string,
  origin?: IMarkerOrigin,
};

type IMarkerDefaultProps = {
  origin: IMarkerOrigin,
};

class Marker extends PureComponent {
  static defaultProps: IMarkerDefaultProps = {
    origin: "bottomCenter",
  };

  props: IMarkerProps;

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerClass = classNames("markerStyle", {
      markerOriginCenter: this.props.origin === "center",
      markerOriginTopLeft: this.props.origin === "topLeft",
      markerOriginBottomCenter: this.props.origin === "bottomCenter",
    });

    return (
      <div className={markerClass}>
        {this.props.label}
        <img src="images/pinMarker3x.png" alt="pin marker" className="markerImage" />
      </div>
    );
  }
}

export default Marker;
