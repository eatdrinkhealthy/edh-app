// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Pill from "../Pill";

describe("<Pill />", function () {
  it("matches render snapshot - active", function () {
    const tree = renderer.create(
      <Pill name="pill1" onClick={() => {}} active>
        Test Pill Button
      </Pill>,
    );
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - inactive", function () {
    const tree = renderer.create(
      <Pill name="pill1" onClick={() => {}} active={false}>
        Test Pill Button
      </Pill>,
    );
    expect(tree).toMatchSnapshot();
  });

  it("should not pass a className prop on to the button component", function () {
    const wrapper = shallow(
      <Pill name="pill1" onClick={() => {}} active={false} className="badClass">
        Test Pill Button
      </Pill>,
    );
    const button = wrapper.find("button");
    expect(button.prop("className")).toBe("pill");
    expect(button.prop("name")).toBe("pill1");
    expect(button.prop("active")).toBe(false);
  });
});
