// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import UserMenu from "../UserMenu";

describe("<UserMenu />", function () {
  it("matches render snapshot - no username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - with username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu username="testUser" />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display the username when passed a user name", function () {
    const wrapper = shallow(<UserMenu username="testUser" />);
    expect(wrapper.find("span").text()).toBe("testUser");
  });
});
