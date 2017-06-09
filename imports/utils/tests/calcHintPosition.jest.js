//  intentionally not flow checking this file (throws error on ClientRect being incompatible type)
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  calcHintPosition,
} from "../calcHintPosition";

describe("calcHintPosition in relation to Marker", function () {
  it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {
    const markerRect = { left: 0, width: 0, right: 0, top: 0, bottom: 0, height: 0 };
    expect(calcHintPosition(null, markerRect, 0, 0, 8, 10, 8, 10)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 90, right: 260, bottom: 260, left: 210 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top NO, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 170, left: 10 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--left");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 210, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom-left' when fits top NO, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 90, right: 160, bottom: 210, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom-left");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 160, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--right");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 160, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--right");
  });

  it("should return 'hint--bottom-right' when fits top NO, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 210, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom-right");
  });

  it("should return 'hint--bottom' when fits top NO, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 90, right: 210, bottom: 210, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom");
  });

  it("should return 'hint--top' when fits top YES, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 160, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--top");
  });

  it("should return 'hint--top-left' when fits top YES, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 160, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--top-left");
  });

  it("should return 'hint--bottom' when fits top YES, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 210, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top YES, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 30, right: 160, bottom: 210, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--left");
  });

  it("should return 'hint--top-right' when fits top YES, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 160, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--top-right");
  });

  it("should return 'hint--top' when fits top YES, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 160, left: 30 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--top");
  });

  it("should return 'hint--right' when fits top YES, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 30, right: 210, bottom: 210, left: 90 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--right");
  });

  it("should return 'hint--bottom' when fits top YES, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 30, right: 500, bottom: 500, left: 10 };
    const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

    expect(calcHintPosition(hintViewArea, markerRect, 150, 50, 8, 10, 8, 10)).toBe("hint--bottom");
  });
});
