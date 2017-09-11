// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import CreateAccount from "../CreateAccount";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";

describe("<CreateAccount />", function () {
  it("matches render snapshot", function () {
    // Per a React blog post, when using renderer, must mock out refs
    // https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
    // eslint-disable-next-line flowtype/no-weak-types
    function createNodeMock(element: HTMLElement): ?Object {
      if (element.type === "input") {
        return {
          focus() {
          },
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

  it("should call handleSubmit on submit with valid form fields", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccount {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledWith("user12", "user12@test.com", "user12pw");
  });

  it("should not call handleSubmit on submit with invalid form fields", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccount {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw2",
      },
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(wrapper.state().formErrors.confirmPassword)
      .toBe("Password and Confirm Password fields do not match.");
    expect(props.handleSubmit).not.toHaveBeenCalled();
  });

  it("should clear input fields and give username focus on successful submit", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccount {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
    );
    const usernameNode = wrapper.find("input#username");
    const confirmPasswordNode = wrapper.find("input#confirmPassword");

    // give focus to confirm password input (like a user would do before submit)
    // $FlowFixMe
    confirmPasswordNode.get(0).focus();
    wrapper.find("input[type='submit']").simulate("submit");

    expect(usernameNode.props().value).toEqual("");
    expect(wrapper.find("input#email").props().value).toEqual("");
    expect(wrapper.find("input#password").props().value).toEqual("");
    expect(confirmPasswordNode.props().value).toEqual("");
    expect(usernameNode.get(0)).toBe(document.activeElement);
  });

  it("should set focus to username input on render", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccount {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
    );

    expect(wrapper.find("input#username").get(0)).toBe(document.activeElement);
  });
});
