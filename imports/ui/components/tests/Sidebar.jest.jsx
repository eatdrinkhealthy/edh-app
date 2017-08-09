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
    // Per a React blog post, when using renderer, must mock out refs
    // https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
    // eslint-disable-next-line flowtype/no-weak-types
    function createNodeMock(element: HTMLElement): ?Object {
      if (element.type === "input") {
        return {
          focus() {},
        };
      }
      return null;
    }
    const options = { createNodeMock };

    const tree = renderer.create(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
