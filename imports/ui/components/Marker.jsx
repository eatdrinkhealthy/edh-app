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
  selected?: boolean,
};

type IMarkerDefaultProps = {
  origin: IMarkerOrigin,
};

class Marker extends PureComponent {
  static defaultProps: IMarkerDefaultProps = {
    origin: "bottomCenter",
  };

  props: IMarkerProps;

  handleOnClick = () => {
    const display = `${this.props.selected ? "selected: " : ""}${this.props.label || "no label."}`;
    alert(display);
  }

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerClass = classNames("markerStyle", {
      markerOriginCenter: this.props.origin === "center",
      markerOriginTopLeft: this.props.origin === "topLeft",
      markerOriginBottomCenter: this.props.origin === "bottomCenter",
    });

    return (
      <div className={markerClass}>
        <img src="images/map_icon_std_darkgreen.svg" alt="pin marker" className="markerImage" />
      </div>
    );
  }
}

export default Marker;
