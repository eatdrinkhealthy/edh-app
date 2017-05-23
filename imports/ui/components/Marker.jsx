// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";
import type { IVenue } from "../../data/state/reducers/searchResultsReducers";

type IMarkerOrigin =
  | "center"
  | "topLeft"
  | "bottomCenter";

class Marker extends PureComponent {
  props: {
    venue: IVenue,
    origin: IMarkerOrigin,
    selected: boolean,
    setSelectedVenueHandler: (venueId: string) => void,
  };


  static defaultProps = {
    origin: "bottomCenter",
    selected: false,
  };

  componentDidMount() {
    // console.log(this.props.venue.id);
    // console.log("rel vp:", this.markerContainer.getBoundingClientRect());
  }

  setRef = (div: HTMLDivElement) => {
    this.markerContainer = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);
  }

  markerContainer: HTMLDivElement;

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerContainerClasses = classNames(
      "markerContainer",
      "hint--color-white-override", // modified html-hint-marker.min.css to add override, see README
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

    const venue = this.props.venue;

    const altStr = `${venue.name} map marker`;

    return (
      <div
        className={markerContainerClasses}
        onClick={this.handleOnClick}
        ref={this.setRef}
      >
        <img src={markerImage} alt={altStr} />
        <div className={hintClasses}>
          <div className="hint-venue-name">{venue.name}</div>
          <div className="hint-venue-address">{venue.location.address}</div>
          <div className="hint-venue-category">{venue.primaryCategory}</div>
        </div>
      </div>
    );
  }
}

export default Marker;
