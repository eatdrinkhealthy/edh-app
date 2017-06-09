// @flow
/* eslint-disable no-bitwise */
/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import type { IViewArea } from "../ui/components/LocationsMap";

//
// center connotes horizontal alignment [i.e. left, left center, center, right center, right]
//
export const fitsCenter = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
): boolean => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return markerCenter - (hintWidth / 2) > hintViewArea.left &&
    markerCenter + (hintWidth / 2) < hintViewArea.right;
};

export const fitsLeftCenter = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintPaddingRight: number,
): boolean => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return (markerCenter + hintPaddingRight) - hintWidth > hintViewArea.left &&
    markerCenter + hintPaddingRight < hintViewArea.right;
};

export const fitsRightCenter = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintPaddingLeft: number,
): boolean => {
  const markerCenter = markerRect.left + (markerRect.width / 2);

  return (markerCenter - hintPaddingLeft) + hintWidth < hintViewArea.right &&
    markerCenter - hintPaddingLeft > hintViewArea.left;
};

//
// middle connotes vertical alignment [i.e. top, middle, bottom]
//
export const fitsMiddle = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintHeight: number,
  hintPaddingBottom: number,
): boolean => {
  const markerCenter = markerRect.top + (markerRect.height / 2);

  return markerCenter + (hintPaddingBottom - hintHeight) < hintViewArea.right;
};


const TOP = 128;
const TOP_LEFT = 64;
const TOP_RIGHT = 32;

const BOTTOM = 16;
const BOTTOM_LEFT = 8;
const BOTTOM_RIGHT = 4;

const RIGHT = 2;
const LEFT = 1;

export const fitLocationsBitmap = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintHeight: number,
  hintPaddingTop: number,
  hintPaddingRight: number,
  hintPaddingBottom: number,
  hintPaddingLeft: number,
): number => {
  const fitsAbove = markerRect.top - hintHeight > hintViewArea.top;
  const fitsBelow = markerRect.bottom + hintHeight < hintViewArea.bottom;
  const fitsRight = markerRect.right + hintWidth < hintViewArea.right;
  const fitsLeft = markerRect.left - hintWidth > hintViewArea.left;

  let positionsBitmap = 0;

  if (fitsAbove && fitsCenter(hintViewArea, markerRect, hintWidth)) {
    positionsBitmap |= TOP;
  }

  if (fitsAbove && fitsLeftCenter(hintViewArea, markerRect, hintWidth, hintPaddingRight)) {
    positionsBitmap |= TOP_LEFT;
  }

  if (fitsAbove && fitsRightCenter(hintViewArea, markerRect, hintWidth, hintPaddingLeft)) {
    positionsBitmap |= TOP_RIGHT;
  }

  if (fitsBelow && fitsCenter(hintViewArea, markerRect, hintWidth)) {
    positionsBitmap |= BOTTOM;
  }

  if (fitsBelow && fitsLeftCenter(hintViewArea, markerRect, hintWidth, hintPaddingRight)) {
    positionsBitmap |= BOTTOM_LEFT;
  }

  if (fitsBelow && fitsRightCenter(hintViewArea, markerRect, hintWidth, hintPaddingLeft)) {
    positionsBitmap |= BOTTOM_RIGHT;
  }

  if (fitsRight && fitsMiddle(hintViewArea, markerRect, hintHeight, hintPaddingBottom)) {
    positionsBitmap |= RIGHT;
  }

  if (fitsLeft && fitsMiddle(hintViewArea, markerRect, hintHeight, hintPaddingBottom)) {
    positionsBitmap |= LEFT;
  }

  return positionsBitmap;
};

export const calcHintPosition = (
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
    const locationsBitmap = fitLocationsBitmap(hintViewArea, markerRect, hintWidth, hintHeight,
      hintPaddingTop, hintPaddingRight, hintPaddingBottom, hintPaddingLeft);

    const fitsAlongBottom = locationsBitmap & (BOTTOM_LEFT | BOTTOM | BOTTOM_RIGHT);
    const fitsAlongTop = locationsBitmap & (TOP_LEFT | TOP | TOP_RIGHT);

    if (fitsAlongBottom) {
      if (locationsBitmap & BOTTOM) {
        hintPos = "hint--bottom";
      } if (locationsBitmap & BOTTOM_RIGHT) {
        hintPos = "hint--bottom-right";
      } else {
        hintPos = "hint--bottom-left";
      }
    } else if (fitsAlongTop) {
      if (locationsBitmap & TOP) {
        hintPos = "hint--top";
      } if (locationsBitmap & TOP_RIGHT) {
        hintPos = "hint--top-right";
      } else {
        hintPos = "hint--top-left";
      }
    } else if (locationsBitmap & RIGHT) {
      hintPos = "hint--right";
    } else if (locationsBitmap & LEFT) {
      hintPos = "hint--left";
    }
    // else fits nowhere, uses default of "hint-bottom"
  }

  return hintPos;
};
