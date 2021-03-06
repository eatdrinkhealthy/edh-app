// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Sidebar from "../Sidebar";
import appReducer from "../../../state/reducers";

describe("<Sidebar />", function() {
  const testStore = createStore(appReducer);

  it("matches render snapshot - no action form", function() {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - login form, with no validation errors", function() {
    // TODO figure out why MemoryRouter isn't passing location to child
    const tree = renderer
      .create(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={["/sidebar?action=login"]} initialIndex={0}>
            <Sidebar
              location={{ pathname: "/sidebar", search: "?action=login", hash: "" }}
            />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - signup form, with no validation errors", function() {
    // TODO figure out why MemoryRouter isn't passing location to child
    const tree = renderer
      .create(
        <Provider store={testStore}>
          <MemoryRouter initialEntries={["/sidebar?action=signup"]} initialIndex={0}>
            <Sidebar
              location={{ pathname: "/sidebar", search: "?action=signup", hash: "" }}
            />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
