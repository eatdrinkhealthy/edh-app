//  intentionally not flow checking this file
//      (Flow incorrectly throws error on ClientRect being incompatible type)
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  calcHintPosition,
  fitLocationsBitmap,
  TOP,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  RIGHT,
  LEFT,
} from "../calcHintPosition";

const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

const hintSpacing = {
  width: 150,
  height: 50,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
};

const TOP_BOUNDARY = 50;
const MIDDLE_BOUNDARY = 65;
const BOTTOM_BOUNDARY = 200;

const LEFT_BOUNDARY = 50;
const LEFT_CENTER_BOUNDARY = 65;   // fully centered does fit
const CENTER_RIGHTSIDE_BOUNDARY = 150;   // fully centered does fit
const CENTER_LEFTSIDE_BOUNDARY = 300;   // fully centered does fit
const RIGHT_CENTER_BOUNDARY = 385;  // fully centered does fit
const RIGHT_BOUNDARY = 400;

describe("calcHintPosition helpers", function () {
  describe("fitLocationsBitmap", function () {
    it("should return TOP when hint fits only at top", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY - 5,
        right: RIGHT_CENTER_BOUNDARY - 5,
        bottom: BOTTOM_BOUNDARY - 5,
        left: LEFT_CENTER_BOUNDARY + 5,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(TOP);
    });

    it("should return TOP_LEFT when hint fits only at top left", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY - 5,
        right: CENTER_RIGHTSIDE_BOUNDARY - 5,
        bottom: BOTTOM_BOUNDARY - 5,
        left: LEFT_CENTER_BOUNDARY - 5,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(TOP_LEFT);
    });

    it("should return BOTTOM when hint fits only at bottom", function () {
      const hintViewArea = { top: 90, right: 305, bottom: 210, left: 145 };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(BOTTOM);
    });
  });
});

describe("calcHintPosition in relation to Marker", function () {
  it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {

    expect(calcHintPosition(null, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 90, right: 260, bottom: 260, left: 210 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top NO, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 170, left: 10 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--left");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 210, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom-left' when fits top NO, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 210, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom-left");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 160, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--right");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 160, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--right");
  });

  it("should return 'hint--bottom-right' when fits top NO, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 210, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom-right");
  });

  it("should return 'hint--bottom' when fits top NO, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 210, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--top' when fits top YES, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 160, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top");
  });

  it("should return 'hint--top-left' when fits top YES, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 160, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top-left");
  });

  it("should return 'hint--bottom' when fits top YES, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 210, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top YES, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 210, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--left");
  });

  it("should return 'hint--top-right' when fits top YES, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 160, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top-right");
  });

  it("should return 'hint--top' when fits top YES, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 160, left: 30 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top");
  });

  it("should return 'hint--right' when fits top YES, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 210, left: 90 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--right");
  });

  it("should return 'hint--bottom' when fits top YES, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 30, right: 500, bottom: 500, left: 10 };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });
});
