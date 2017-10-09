// @flow
/* eslint-disable no-bitwise */
/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import type { IViewArea } from "../ui/components/Map";

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

export const calcHintPosition = (
  hintViewArea: ?IViewArea,
  markerRect: ClientRect,
  hint: IDivSpacing,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea) {
    // center connotes horizontal, middle connotes vertical
    const markerCenter = markerRect.left + (markerRect.width / 2);
    const markerMiddle = markerRect.top + (markerRect.height / 2);

    const fitsTop = markerRect.top - hint.height > hintViewArea.top;
    const fitsMiddle = markerMiddle - hint.paddingBottom - hint.height > hintViewArea.top;
    const fitsBottom = markerRect.bottom + hint.height < hintViewArea.bottom;

    const fitsRight = markerRect.right + hint.width < hintViewArea.right;
    const fitsLeft = markerRect.left - hint.width > hintViewArea.left;

    // when centering, html-hint offsets the center by that sides padding amount

    const fitsRightCenter = (markerCenter - hint.paddingLeft) + hint.width < hintViewArea.right &&
      markerCenter - hint.paddingLeft > hintViewArea.left;

    const fitsLeftCenter = (markerCenter + hint.paddingRight) - hint.width > hintViewArea.left &&
      markerCenter + hint.paddingRight < hintViewArea.right;

    const fitsCenter = markerCenter - (hint.width / 2) > hintViewArea.left &&
      markerCenter + (hint.width / 2) < hintViewArea.right;

    if (fitsBottom) {
      if (fitsCenter) {
        hintPos = "hint--bottom";
      } else if (fitsRightCenter) {
        hintPos = "hint--bottom-right";
      } else if (fitsLeftCenter) {
        hintPos = "hint--bottom-left";
      }
    } else if (fitsTop) {
      if (fitsCenter) {
        hintPos = "hint--top";
      } else if (fitsRightCenter) {
        hintPos = "hint--top-right";
      } else if (fitsLeftCenter) {
        hintPos = "hint--top-left";
      }
    } else if (fitsMiddle) {
      if (fitsRight) {
        hintPos = "hint--right";
      } else if (fitsLeft) {
        hintPos = "hint--left";
      }
    }
    // else fits nowhere, uses default of "hint-bottom"
  }

  return hintPos;
};
