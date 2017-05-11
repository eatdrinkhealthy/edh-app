// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";
import type { IFoursquareVenue } from "../../api/foursquare/foursquareApi";

type IMarkerOrigin =
  | "center"
  | "topLeft"
  | "bottomCenter";

type IMarkerProps = {
  venue: IFoursquareVenue,
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
    console.log(this.props.venue.id);
    console.log("rel vp:", this.markerContainer.getBoundingClientRect());
  }

  setRef = (div: HTMLDivElement) => {
    this.markerContainer = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);
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

    const altStr = `${this.props.venue.name} map marker`;

    return (
      <div
        className={markerContainerClasses}
        onClick={this.handleOnClick}
        ref={this.setRef}
      >
        <img src={markerImage} alt={altStr} />
        <div className={hintClasses}>
          {`venueId: ${this.props.venue.id}`}
        </div>
      </div>
    );
  }
}

export default Marker;
