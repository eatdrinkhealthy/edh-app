/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import FilterContainer from "../FilterContainer";

describe("<FilterContainer />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(<FilterContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
