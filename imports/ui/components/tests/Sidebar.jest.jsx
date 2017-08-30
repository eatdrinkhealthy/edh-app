// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Sidebar from "../Sidebar";

describe("<Sidebar />", function () {
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

  it("matches render snapshot - no action form", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - login form", function () {
    const tree = renderer.create(
      // TODO figure out why MemoryRouter isn't passing location to child
      <MemoryRouter initialEntries={["/sidebar?action=login"]} initialIndex={0}>
        <Sidebar location={{ pathname: "/sidebar", search: "?action=login", hash: "" }} />
      </MemoryRouter>,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - signup form", function () {
    const tree = renderer.create(
      // TODO figure out why MemoryRouter isn't passing location to child
      <MemoryRouter initialEntries={["/sidebar?action=signup"]} initialIndex={0}>
        <Sidebar location={{ pathname: "/sidebar", search: "?action=signup", hash: "" }} />
      </MemoryRouter>,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
