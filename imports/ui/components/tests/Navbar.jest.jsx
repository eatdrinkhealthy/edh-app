// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Navbar from "../Navbar";

describe("<Navbar />", function () {
  it("matches render snapshot - with username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <Navbar username="testuser" />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - with null username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <Navbar username="" />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
