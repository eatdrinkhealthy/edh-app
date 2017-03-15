/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import Layout from "../Layout";

describe("<Layout />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(<Layout><p>children</p></Layout>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
