// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Navbar from "../Navbar";
import { elements as es } from "../../../../tests/end-to-end/elements";

describe("<Navbar />", function() {
  it("matches render snapshot - with username", function() {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navbar username="testuser" userLoggedIn logout={() => {}} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - with null username", function() {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navbar username="" logout={() => {}} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show username, when user logged in", function() {
    const wrapper = shallow(
      <Navbar userLoggedIn username="testuser" logout={jest.fn()} />,
    );
    expect(wrapper.find(es.navbar.username).prop("children")).toEqual(
      "Welcome, testuser!",
    );
  });

  it("should not show username, when user not logged in", function() {
    const wrapper = shallow(<Navbar username="" logout={jest.fn()} />);
    expect(wrapper.find(es.navbar.username).prop("children")).toEqual(""); // no username
  });
});
