// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Navbar from "../Navbar";

describe("<Navbar />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
