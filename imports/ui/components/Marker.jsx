// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";
import type { IVenue } from "../../data/state/reducers/searchResultsReducers";
import type { IViewArea } from "./LocationsMap";

export const calcHintPosition = (
  hintViewArea: ?IViewArea,
  hintArea: ?IViewArea,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea && hintArea) {
    hintPos = "hint--top";
  }
  return hintPos;
};

type IMarkerOrigin = "center" | "topLeft" | "bottomCenter";

class Marker extends PureComponent {
  props: {
    venue: IVenue,
    origin?: IMarkerOrigin,
    selected?: boolean,
    setSelectedVenueHandler: (venueId: string) => void,
    getHintViewArea?: () => IViewArea,
  };

  static defaultProps = {
    origin: "bottomCenter",
    selected: false,
  };

  state = {
    hintPosition: "hint--bottom",
  };

  setHintHolderRef = (div: HTMLDivElement) => {
    this.hintHolder = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);

    const hintViewArea = this.props.getHintViewArea ? this.props.getHintViewArea() : null;

    this.setState({
      hintPosition: calcHintPosition(hintViewArea, this.hintHolder.getBoundingClientRect()),
    });
  }

  hintHolder: HTMLDivElement;

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
      >
        <img src={markerImage} alt={altStr} />
        <div
          className={hintClasses}
          ref={this.setHintHolderRef}
        >
          <div className="hint-venue-name">{venue.name}</div>
          <div className="hint-venue-address">{venue.location.address}</div>
          <div className="hint-venue-category">{venue.primaryCategory}</div>
        </div>
      </div>
    );
  }
}

export default Marker;
