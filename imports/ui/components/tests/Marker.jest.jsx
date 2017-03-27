// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import Marker from "../Marker";

describe("<Marker />", function () {
  it("matches render snapshot, no text", function () {
    const tree = renderer.create(<Marker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot, with text", function () {
    const tree = renderer.create(<Marker label="Some Place Cool" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
