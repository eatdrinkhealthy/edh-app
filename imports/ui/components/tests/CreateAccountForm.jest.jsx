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

describe("<CreateAccountForm />", function () {
  const testStore = createStore(appReducer);

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
      <Provider store={testStore}>
        <CreateAccountForm onSubmit={() => {}} />
      </Provider>,
      options,
    ).toJSON();
    expect(tree).toMatchSnapshot();
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