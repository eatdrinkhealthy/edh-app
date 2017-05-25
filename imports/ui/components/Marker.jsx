// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";
import type { IVenue } from "../../data/state/reducers/searchResultsReducers";

export const calcHintPosition = (
  viewBoundaryRect: ?ClientRect,
): string => {
  let hintPos = "hint--bottom";

  if (viewBoundaryRect) {
    hintPos = "hint--top";
  }
  return hintPos;
};

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
    viewBoundaryRect: ?ClientRect,
  };

  static defaultProps = {
    origin: "bottomCenter",
    selected: false,
    viewBoundaryRect: null,
  };

  state = {
    hintPosition: "hint--bottom",
  };

  componentDidMount() {
    console.log(this.props.venue.name);
    console.log("rel vp:", this.markerContainer.getBoundingClientRect());
  }

  setRef = (div: HTMLDivElement) => {
    this.markerContainer = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);

    this.setState({ hintPosition: calcHintPosition(this.props.viewBoundaryRect) });
  }

  markerContainer: HTMLDivElement;

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerContainerClasses = classNames(
      "markerContainer",
      "hint--color-white-override",
      "hint--html",
      "hint--info",
      this.state.hintPosition,
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
