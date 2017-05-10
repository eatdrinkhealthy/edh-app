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
  props: IMarkerProps;

  markerContainer: HTMLDivElement;

  static defaultProps: IMarkerDefaultProps = {
    origin: "bottomCenter",
  };

  componentDidMount() {
    console.log(this.props.venueId);
    console.log("rel vp:", this.markerContainer.getBoundingClientRect());
  }

  setRef = (div: HTMLDivElement) => {
    this.markerContainer = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venueId);
  }

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerContainerClasses = classNames(
      "markerContainer",
      "hint",
      "hint--html",
      "hint--info",
      "hint--bottom", // TODO calculate hint location, based on map w & h and marker position
      this.props.selected ? "hint--always" : "hint--hidden",
      {
        markerOriginCenter: this.props.origin === "center",
        markerOriginTopLeft: this.props.origin === "topLeft",
        markerOriginBottomCenter: this.props.origin === "bottomCenter",
      },
    );

    const markerImage = this.props.selected
      ? "/images/map_marker_selected.svg"
      : "/images/map_marker_unselected.svg";

    const hintClasses = classNames(
      "hint__content",
      "hintContainer",
    );

    return (
      <div
        className={markerContainerClasses}
        onClick={this.handleOnClick}
        ref={this.setRef}
      >
        <img src={markerImage} alt="map pin marker" />
        <div className={hintClasses}>
          {`venueId: ${this.props.venueId}`}
        </div>
      </div>
    );
  }
}

export default Marker;
