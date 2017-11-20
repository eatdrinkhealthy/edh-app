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
  it("matches render snapshot - userLoggedIn true", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu userLoggedIn logout={jest.fn()} />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - userLoggedIn false", function () {
    const tree = renderer.create(
      <MemoryRouter>
        <UserMenu userLoggedIn={false} logout={jest.fn()} />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show login & join buttons when not logged in, and not show logout", function () {
    const wrapper = shallow(<UserMenu logout={jest.fn()} />);
    expect(wrapper.find(es.userMenu.joinLink).length).toBe(1);
    expect(wrapper.find(es.userMenu.loginLink).length).toBe(1);
    expect(wrapper.find(es.userMenu.logoutLink).length).toBe(0);
  });

  it("should not show login & join buttons when logged in, and show logout", function () {
    const wrapper = shallow(<UserMenu userLoggedIn logout={jest.fn()} />);
    expect(wrapper.find(es.userMenu.joinLink).length).toBe(0);
    expect(wrapper.find(es.userMenu.loginLink).length).toBe(0);
    expect(wrapper.find(es.userMenu.logoutLink).length).toBe(1);
  });

  it("should call the logout prop function when clicking the logout button", function () {
    const logoutFn = jest.fn();

    const wrapper = shallow(<UserMenu userLoggedIn logout={logoutFn} />);
    wrapper.find("a").simulate("click");
    expect(logoutFn).toHaveBeenCalled();
  });
});
