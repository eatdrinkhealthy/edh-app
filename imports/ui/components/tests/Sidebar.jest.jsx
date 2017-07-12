// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Sidebar from "../Sidebar";

describe("<Sidebar />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
