// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { calcHintPosition, getDivSpacing } from "../../utils/calcHintPosition";

import type { IVenue } from "../../state/reducers/searchResultsReducers";
import type { IViewArea } from "./Map";

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
    getHintViewArea: undefined,
  };

  state = {
    hintPosition: "hint--bottom",
  };

  setHintHolderRef = (div: HTMLDivElement) => {
    this.hintHolder = div;
  };

  setMarkerHolderRef = (div: HTMLDivElement) => {
    this.markerHolder = div;
  };

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);

    const hintViewArea = this.props.getHintViewArea ? this.props.getHintViewArea() : null;

    this.setState({
      hintPosition: calcHintPosition(
        hintViewArea,
        this.markerHolder.getBoundingClientRect(),
        getDivSpacing(this.hintHolder),
      ),
    });
  };

  hintHolder: HTMLDivElement;

  markerHolder: HTMLDivElement;

  render() {
    // eslint-disable-line flowtype/require-return-type
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

    const hintClasses = classNames("hint__content", "hintContainer");

    const { venue } = this.props;

    const altStr = `${venue.name} map marker`;

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <div
        className={markerContainerClasses}
        ref={this.setMarkerHolderRef}
        onClick={this.handleOnClick}
        role="tooltip"
      >
        <img src={markerImage} alt={altStr} />
        <div className={hintClasses} ref={this.setHintHolderRef}>
          <div className="hint-venue-name">{venue.name}</div>
          <div className="hint-venue-address">{venue.location.address}</div>
          <div className="hint-venue-category">{venue.primaryCategory}</div>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  }
}

export default Marker;
