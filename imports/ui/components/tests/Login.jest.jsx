// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import Login from "../Login";

describe("<Login />", function () {
  it("matches render snapshot", function () {
    function createNodeMock(element) {
      if (element.type === "input") {
        return {
          focus() {},
        };
      }
      return null;
    }
    const options = { createNodeMock };

    const tree = renderer.create(<Login handleSubmit={() => {}} />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
