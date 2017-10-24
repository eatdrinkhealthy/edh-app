// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { mount } from "enzyme";
import { Col } from "../ReactBootstrapLib";

describe("ReactBootstrapLib", function () {
  describe("Col - with global show-grid setting", function () {
    it("should add show-grid class when window.SHOW_GRID is true", function () {
      window.SHOW_GRID = true;
      const wrapper = mount(<Col><span>test text</span></Col>);
      expect(wrapper.find("div").prop("className")).toContain("show-grid");
    });

    it("should NOT add show-grid class when window.SHOW_GRID is false", function () {
      window.SHOW_GRID = false;
      const wrapper = mount(<Col><span>test text</span></Col>);
      expect(wrapper.find("div").prop("className")).not.toContain("show-grid");
    });

    it("should NOT add show-grid class when window.SHOW_GRID is undefined", function () {
      window.SHOW_GRID = undefined;
      const wrapper = mount(<Col><span>test text</span></Col>);
      expect(wrapper.find("div").prop("className")).not.toContain("show-grid");
    });

    it("should pass props, classNames but no show-grid when window.SHOW_GRID false", function () {
      window.SHOW_GRID = false;
      const wrapper = mount(<Col xs={4} className="thisClass"><span>test text</span></Col>);
      expect(wrapper.find("div").prop("className")).toContain("thisClass");
      expect(wrapper.find("div").prop("className")).toContain("col-xs-4");
      expect(wrapper.find("div").prop("className")).not.toContain("show-grid");
    });

    it("should pass props, classNames and show-grid when window.SHOW_GRID true", function () {
      window.SHOW_GRID = true;
      const wrapper = mount(<Col xs={4} className="thisClass"><span>test text</span></Col>);
      expect(wrapper.find("div").prop("className")).toContain("thisClass");
      expect(wrapper.find("div").prop("className")).toContain("col-xs-4");
      expect(wrapper.find("div").prop("className")).toContain("show-grid");
    });
  });
});
