// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import CreateAccountForm from "../CreateAccountForm";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";
import appReducer from "../../../state/reducers";
import { elements as els } from "../../../../tests/end-to-end/elements";

describe("<CreateAccountForm />", function () {
  const testStore = createStore(appReducer);

  it("matches render snapshot - with no form validation errors", function () {
    // render form with no input values to display validation errors
    const tree = renderer.create(
      <Provider store={testStore}>
        <CreateAccountForm onSubmit={() => {}} />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should set username too short error, when username less than min length", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        username: "abc",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.username).simulate("blur"); // blur triggers field validation

    expect(wrapper.find(els.createAccountForm.usernameError).text())
      .toBe("Username must be at least 4 characters.");
  });

  it("should set invalid email error, when email format is invalid", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        email: "user12",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.email).simulate("blur"); // blur triggers field validation

    expect(wrapper.find(els.createAccountForm.emailError).text())
      .toBe("Email address must be a valid email address format.");
  });

  it("should set password too short error, when password is too short", function () {
    const props = {
      onSubmit: jest.fn(),
    };

    const wrapper = mountFormWithInputs(
      <CreateAccountForm {...props} />,
      {
        password: "us",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.password).simulate("blur"); // blur triggers field validation

    expect(wrapper.find(els.createAccountForm.passwordError).text())
      .toBe("Password must be at least 4 characters.");
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

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");
    expect(wrapper.find(els.createAccountForm.confirmPasswordError).text())
      .toBe("Password and Confirm Password fields do not match.");
    expect(props.onSubmit).not.toHaveBeenCalled();
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

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");
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
    const usernameNode = wrapper.find(els.createAccountForm.username);
    const passwordNode = wrapper.find(els.createAccountForm.password);
    const confirmPasswordNode = wrapper.find(els.createAccountForm.confirmPassword);

    // give focus to confirmPassword input (like a user would do before submit)
    // $FlowFixMe
    confirmPasswordNode.get(0).focus();
    wrapper.find(els.createAccountForm.submitButton).simulate("submit");

    expect(usernameNode.props().value).toEqual("user12");
    expect(passwordNode.props().value).toEqual("");
    expect(confirmPasswordNode.props().value).toEqual("");
    // NOTE: document.querySelector called in onSubmitSuccess works in browser but not in jest
    // expect(usernameNode.get(0)).toEqual(document.activeElement);
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

    expect(wrapper.find(els.createAccountForm.username).get(0)).toBe(document.activeElement);
  });
});
