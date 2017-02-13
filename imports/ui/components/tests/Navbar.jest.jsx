/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import Navbar from "../Navbar";

describe("<Navbar />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip("links to Sidebar", function () {
    // TODO test route to Sidebar
  });

  it.skip("links to Filter", function () {
    // TODO test route to Filter
  });
});
