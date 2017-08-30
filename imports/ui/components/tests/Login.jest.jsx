// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import Login from "../Login";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";

describe("<Login />", function () {
  it("matches render snapshot", function () {
    function createNodeMock(element) {
      if (element.type === "input") {
        return {
          focus() {},
        };
      }
      return null;
    }
    const options = { createNodeMock };

    const tree = renderer.create(<Login handleSubmit={() => {}} />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call handleSubmit on submit with form field values", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <Login {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledWith("user12", "user12pw");
  });

  it("should clear input fields and give username/email focus on successful submit", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <Login {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
    );
    const usernameEmailNode = wrapper.find("input#usernameEmail");
    const passwordNode = wrapper.find("input#loginPassword");

    // give focus to password input (like a user would do before submit)
    // $FlowFixMe
    passwordNode.get(0).focus();
    wrapper.find("input[type='submit']").simulate("submit");

    expect(usernameEmailNode.props().value).toEqual("");
    expect(passwordNode.props().value).toEqual("");
    expect(usernameEmailNode.get(0)).toBe(document.activeElement);
  });

  it("should set focus to username input on render", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <Login {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
    );

    expect(wrapper.find("input#usernameEmail").get(0)).toBe(document.activeElement);
  });
});
