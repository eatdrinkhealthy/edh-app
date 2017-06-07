// @flow
/* eslint-disable no-bitwise */
/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import type { IViewArea } from "../ui/components/LocationsMap";

const fitsHorizontalCenter = (hintViewArea, markerRect, hintWidth) => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return markerCenter - (hintWidth / 2) > hintViewArea.left &&
    markerCenter + (hintWidth / 2) < hintViewArea.right;
};

const fitsVerticalCenter = (hintViewArea, markerRect, hintHeight, hintPaddingBottom) => {
  const markerCenter = markerRect.top + (markerRect.height / 2);

  return markerCenter + (hintPaddingBottom - hintHeight) < hintViewArea.right;
};

const fitsLeftCenter = (hintViewArea, markerRect, hintWidth, hintPaddingRight) => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return (markerCenter + hintPaddingRight) - hintWidth > hintViewArea.left &&
    markerCenter + hintPaddingRight < hintViewArea.right;
};

const fitsRightCenter = (hintViewArea, markerRect, hintWidth, hintPaddingLeft) => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return (markerCenter - hintPaddingLeft) + hintWidth < hintViewArea.right &&
    markerCenter - hintPaddingLeft > hintViewArea.left;
};

const TOP = 128;
const TOP_LEFT = 64;
const TOP_RIGHT = 32;

const BOTTOM = 16;
const BOTTOM_LEFT = 8;
const BOTTOM_RIGHT = 4;

const RIGHT = 2;
const LEFT = 1;

const fitsBitmap = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintHeight: number,
  hintPaddingTop: number,
  hintPaddingRight: number,
  hintPaddingBottom: number,
  hintPaddingLeft: number,
) => {
  const fitsAbove = markerRect.top - hintHeight > hintViewArea.top;
  const fitsBelow = markerRect.bottom + hintHeight < hintViewArea.bottom;
  const fitsRight = markerRect.right + hintWidth < hintViewArea.right;
  const fitsLeft = markerRect.left - hintWidth > hintViewArea.left;

  let positionsBitmap = 0;

  if (fitsAbove && fitsHorizontalCenter(hintViewArea, markerRect, hintWidth)) {
    positionsBitmap |= TOP;
  }

  if (fitsAbove && fitsLeftCenter(hintViewArea, markerRect, hintWidth, hintPaddingRight)) {
    positionsBitmap |= TOP_LEFT;
  }

  if (fitsAbove && fitsRightCenter(hintViewArea, markerRect, hintWidth, hintPaddingLeft)) {
    positionsBitmap |= TOP_RIGHT;
  }

  if (fitsBelow && fitsHorizontalCenter(hintViewArea, markerRect, hintWidth)) {
    positionsBitmap |= BOTTOM;
  }

  if (fitsBelow && fitsLeftCenter(hintViewArea, markerRect, hintWidth, hintPaddingRight)) {
    positionsBitmap |= BOTTOM_LEFT;
  }

  if (fitsBelow && fitsRightCenter(hintViewArea, markerRect, hintWidth, hintPaddingLeft)) {
    positionsBitmap |= BOTTOM_RIGHT;
  }

  if (fitsRight && fitsVerticalCenter(hintViewArea, markerRect, hintHeight, hintPaddingBottom)) {
    positionsBitmap |= RIGHT;
  }

  if (fitsLeft && fitsVerticalCenter(hintViewArea, markerRect, hintHeight, hintPaddingBottom)) {
    positionsBitmap |= LEFT;
  }

  return positionsBitmap;
};

const calcHintPosition = (
  hintViewArea: ?IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintHeight: number,
  hintPaddingTop: number,
  hintPaddingRight: number,
  hintPaddingBottom: number,
  hintPaddingLeft: number,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea) {
    const locationsBitmap = fitsBitmap(
      hintViewArea,
      markerRect,
      hintWidth,
      hintHeight,
      hintPaddingTop,
      hintPaddingRight,
      hintPaddingBottom,
      hintPaddingLeft,
    );

    switch (locationsBitmap) {
      case LEFT:
        hintPos = "hint--left";
        break;

      case RIGHT:
        hintPos = "hint--right";
        break;

      case RIGHT | LEFT:
        hintPos = "hint--right";
        break;

      case TOP | BOTTOM | LEFT:
        hintPos = "hint--left";
        break;

      case TOP | BOTTOM | RIGHT:
        hintPos = "hint--right";
        break;

      case TOP:
      case TOP | RIGHT | LEFT:
        hintPos = "hint--top";
        break;

      case TOP_LEFT:
        hintPos = "hint--top-left";
        break;

      case TOP_RIGHT:
        hintPos = "hint--top-right";
        break;

      case BOTTOM_LEFT:
        hintPos = "hint--bottom-left";
        break;

      case BOTTOM_RIGHT:
        hintPos = "hint--bottom-right";
        break;

      default:
        // all other location combinations, "hint--bottom"
        // this includes, fits everywhere, and fits nowhere
        break;
    }
  }

  return hintPos;
};

export default calcHintPosition;
