// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import CreateAccount from "../CreateAccount";
import mountCreateAccountForm from "./CreateAccount_helper";

describe("<CreateAccount />", function () {
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
      <CreateAccount handleSubmit={() => {}} />,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call handleSubmit on submit with form field values", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountCreateAccountForm(
      <CreateAccount {...props} />,
      "user12",
      "user12@test.com",
      "user12pw",
      "user12pw",
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledWith("user12", "user12@test.com", "user12pw");
  });

  it("should clear the form input fields (state) on successful submit", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountCreateAccountForm(
      <CreateAccount {...props} />,
      "user12",
      "user12@test.com",
      "user12pw",
      "user12pw",
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(wrapper.find("input#username").props().value).toEqual("");
    expect(wrapper.find("input#email").props().value).toEqual("");
    expect(wrapper.find("input#password").props().value).toEqual("");
    expect(wrapper.find("input#confirmPassword").props().value).toEqual("");
  });
});
