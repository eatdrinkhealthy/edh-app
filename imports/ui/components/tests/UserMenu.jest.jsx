// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import UserMenu from "../UserMenu";
import { elements as es } from "../../../../tests/end-to-end/elements";

describe("<UserMenu />", function () {
  it("matches render snapshot - null username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu username={null} logout={jest.fn()} />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - with username", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu username="testUser" logout={jest.fn()} />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display the username when passed a user name", function () {
    const wrapper = shallow(<UserMenu username="testUser" logout={jest.fn()} />);
    expect(wrapper.find(es.userMenu.username).text()).toBe("Welcome, testUser!");
  });

  it("should not show login & join buttons when logged in, and show logout", function () {
    const wrapper = shallow(<UserMenu username="testUser" logout={jest.fn()} />);
    expect(wrapper.find(es.userMenu.joinLink).length).toBe(0);
    expect(wrapper.find(es.userMenu.loginLink).length).toBe(0);
    expect(wrapper.find(es.userMenu.logoutLink).length).toBe(1);
  });

  it("should call the logout prop function when clicking the logout button", function () {
    const logoutFn = jest.fn();

    const wrapper = shallow(<UserMenu username={"testUser"} logout={logoutFn} />);
    wrapper.find("a").simulate("click");
    expect(logoutFn).toHaveBeenCalled();
  });
});
