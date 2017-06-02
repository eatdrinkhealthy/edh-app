// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import calcHintPosition from "../calcHintPosition";

describe("calcHintPosition in relation to Marker", function () {
  it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {
    expect(calcHintPosition(null)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' if second param, hintArea, is null", function () {
    expect(calcHintPosition({ top: 0, right: 0, bottom: 0, left: 0 }, null)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 10, right: 100, bottom: 100, left: 10 };
    const hintArea = { top: 10, right: 120, bottom: 120, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top NO, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 600, bottom: 600, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--left");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 600, bottom: 500, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom-left' when fits top NO, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 10, right: 110, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 120, bottom: 80, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom-left");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 120, bottom: 600, left: 5 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--right");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 120, bottom: 600, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--right");
  });

  it("should return 'hint--bottom-right' when fits top NO, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 10, right: 120, bottom: 500, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom-right");
  });

  it("should return 'hint--bottom' when fits top NO, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 9, right: 120, bottom: 120, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--top' when fits top YES, right NO, bottom NO, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 601, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top");
  });

  it("should return 'hint--top-left' when fits top YES, right NO, bottom NO, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 600, bottom: 600, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top-left");
  });

  it("should return 'hint--bottom' when fits top YES, right NO, bottom YES, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 600, bottom: 500, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top YES, right NO, bottom YES, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 600, bottom: 500, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--left");
  });

  it("should return 'hint--top-right' when fits top YES, right YES, bottom NO, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 600, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top-right");
  });

  it("should return 'hint--top' when fits top YES, right YES, bottom NO, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 601, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top");
  });

  it("should return 'hint--right' when fits top YES, right YES, bottom YES, left NO", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 500, left: 10 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--right");
  });

  it("should return 'hint--bottom' when fits top YES, right YES, bottom YES, left YES", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 120, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });
});
