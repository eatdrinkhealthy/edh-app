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
  venueId: string,
  origin?: IMarkerOrigin,
  selected?: boolean,
  setSelectedVenueHandler: (venueId: string) => void,
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
    this.props.setSelectedVenueHandler(this.props.venueId);
  }

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerContainerClasses = classNames("markerContainer", {
      markerOriginCenter: this.props.origin === "center",
      markerOriginTopLeft: this.props.origin === "topLeft",
      markerOriginBottomCenter: this.props.origin === "bottomCenter",
      markerSelected: this.props.selected,
    });

    const markerClasses = classNames("markerBase", {
      markerUnselected: !this.props.selected,
      markerSelected: this.props.selected,
    });

    return (
      <div className={markerContainerClasses} onClick={this.handleOnClick}>
        <div className={markerClasses} />
      </div>
    );
  }
}

export default Marker;
