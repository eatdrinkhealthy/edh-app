// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import CreateAccountForm from "../CreateAccountForm";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";
import appReducer from "../../../state/reducers";

describe("<CreateAccountForm />", function () {
  const testStore = createStore(appReducer);

  it("matches render snapshot - with form validation errors", function () {
    // render form with no input values to display validation errors
    const tree = renderer.create(
      <Provider store={testStore}>
        <CreateAccountForm onSubmit={() => {}} />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot - without form validation errors", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    // mount form with valid input values to suppress form validation errors
    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "User12pw2",
      },
      testStore,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set confirmPassword error and NOT call onSubmit, when password !== confirm password", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "User12pw2",
      },
      testStore,
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(wrapper.find("#confirmPasswordError").text())
      .toBe("Password and Confirm Password fields do not match.");
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it("should set username too short error, when username less than min length", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "abc",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "User12pw2",
      },
      testStore,
    );

    expect(wrapper.find("#usernameError").text())
      .toBe("Username must be at least 4 characters.");
  });

  it("should set invalid email error, when email format is invalid", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "abcd",
        email: "user12",
        password: "user12pw",
        confirmPassword: "User12pw2",
      },
      testStore,
    );

    expect(wrapper.find("#emailError").text())
      .toBe("Email address must be a valid email address format.");
  });

  it("should call onSubmit, when submitting and all form fields are valid", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.onSubmit).toHaveBeenCalledWith(
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      expect.anything(),
      expect.anything(),
    );
  });

  it("should clear password and confirmPassword on successful submit", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );
    const passwordNode = wrapper.find("input#password");
    const confirmPasswordNode = wrapper.find("input#confirmPassword");

    wrapper.find("input[type='submit']").simulate("submit");

    expect(passwordNode.props().value).toEqual("");
    expect(confirmPasswordNode.props().value).toEqual("");
  });

  it("should set focus to username input on render", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    expect(wrapper.find("input#username").get(0)).toBe(document.activeElement);
  });
});
