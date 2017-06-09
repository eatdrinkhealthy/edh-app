// @flow
/* eslint-disable no-bitwise */
/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import type { IViewArea } from "../ui/components/LocationsMap";

export type IDivSpacing = {
  width: number,
  height: number,
  paddingRight: number,
  paddingBottom: number,
  paddingLeft: number,
};

export const getDivSpacing = (
  elementRef: HTMLDivElement,
): IDivSpacing => {
  const {
    paddingBottom: hintPaddingBottom,
    paddingLeft: hintPaddingLeft,
    paddingRight: hintPaddingRight,
  } = window.getComputedStyle(elementRef, null);  // TODO (TBD) confirm px, if not, convert

  return {
    width: elementRef.getBoundingClientRect().width,
    height: elementRef.getBoundingClientRect().height,
    paddingRight: parseInt(hintPaddingRight, 10),
    paddingBottom: parseInt(hintPaddingBottom, 10),
    paddingLeft: parseInt(hintPaddingLeft, 10),
  };
};

export const TOP = 128;
export const TOP_LEFT = 64;
export const TOP_RIGHT = 32;

export const BOTTOM = 16;
export const BOTTOM_LEFT = 8;
export const BOTTOM_RIGHT = 4;

export const RIGHT = 2;
export const LEFT = 1;

export const fitLocationsBitmap = (
  hintViewArea: IViewArea,
  markerRect: ClientRect,
  hint: IDivSpacing,
): number => {
  // center connotes horizontal, middle connotes vertical
  const markerCenter = markerRect.left + (markerRect.width / 2);
  const markerMiddle = markerRect.top + (markerRect.height / 2);

  const fitsTop = markerRect.top - hint.height > hintViewArea.top;
  const fitsMiddle = markerMiddle - hint.paddingBottom - hint.height > hintViewArea.top;
  const fitsBottom = markerRect.bottom + hint.height < hintViewArea.bottom;

  const fitsRight = markerRect.right + hint.width < hintViewArea.right;
  const fitsLeft = markerRect.left - hint.width > hintViewArea.left;

  // when centering, html-hint offsets the center by that sides padding amount

  // TODO need write tests since move padding adjustment to other side of center
  const fitsRightCenter = (markerCenter - hint.paddingLeft) + hint.width < hintViewArea.right &&
    markerCenter - hint.paddingLeft > hintViewArea.left;

  // TODO need write tests since move padding adjustment to other side of center
  const fitsLeftCenter = (markerCenter + hint.paddingRight) - hint.width > hintViewArea.left &&
    markerCenter + hint.paddingRight < hintViewArea.right;

  const fitsCenter = markerCenter - (hint.width / 2) > hintViewArea.left &&
    markerCenter + (hint.width / 2) < hintViewArea.right;

  let positionsBitmap = 0;

  if (fitsTop && fitsCenter) {
    positionsBitmap |= TOP;
  }
  if (fitsTop && fitsLeftCenter) {
    positionsBitmap |= TOP_LEFT;
  }
  if (fitsTop && fitsRightCenter) {
    positionsBitmap |= TOP_RIGHT;
  }
  if (fitsBottom && fitsCenter) {
    positionsBitmap |= BOTTOM;
  }
  if (fitsBottom && fitsLeftCenter) {
    positionsBitmap |= BOTTOM_LEFT;
  }
  if (fitsBottom && fitsRightCenter) {
    positionsBitmap |= BOTTOM_RIGHT;
  }
  if (fitsRight && fitsMiddle) {
    positionsBitmap |= RIGHT;
  }
  if (fitsLeft && fitsMiddle) {
    positionsBitmap |= LEFT;
  }

  return positionsBitmap;
};

export const calcHintPosition = (
  hintViewArea: ?IViewArea,
  markerRect: ClientRect,
  hintSpacing: IDivSpacing,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea) {
    const locationsBitmap = fitLocationsBitmap(hintViewArea, markerRect, hintSpacing);

    const fitsAlongBottom = locationsBitmap & (BOTTOM_LEFT | BOTTOM | BOTTOM_RIGHT);
    const fitsAlongTop = locationsBitmap & (TOP_LEFT | TOP | TOP_RIGHT);
    const fitsRight = locationsBitmap & RIGHT;
    const fitsLeft = locationsBitmap & LEFT;

    if (fitsAlongBottom) {
      if (locationsBitmap & BOTTOM) {
        hintPos = "hint--bottom";
      } else if (locationsBitmap & BOTTOM_RIGHT) {
        hintPos = "hint--bottom-right";
      } else {
        hintPos = "hint--bottom-left";
      }
    } else if (fitsAlongTop) {
      if (locationsBitmap & TOP) {
        hintPos = "hint--top";
      } else if (locationsBitmap & TOP_RIGHT) {
        hintPos = "hint--top-right";
      } else {
        hintPos = "hint--top-left";
      }
    } else if (fitsRight) {
      hintPos = "hint--right";
    } else if (fitsLeft) {
      hintPos = "hint--left";
    }
    // else fits nowhere, uses default of "hint-bottom"
  }

  return hintPos;
};
