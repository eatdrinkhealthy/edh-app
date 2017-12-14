// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import LoginForm from "../LoginForm";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";
import appReducer from "../../../state/reducers";

describe("<LoginForm />", function () {
  const testStore = createStore(appReducer);

  // NOTE: we actually pass handleSubmit to the component, but redux-form calls onSubmit
  const props = {
    onSubmit: jest.fn(),
  };

  it("matches render snapshot, with form validation errors", function () {
    // render form with no input values to display validation errors
    const tree = renderer.create(
      <Provider store={testStore}>
        <LoginForm onSubmit={() => {}} />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip("should set username / email required validation error, when not provided", function () {

  });

  it.skip("should set password required validation error, when not provided", function () {

  });

  it("should call onSubmit on submit with form field values", function () {
    const wrapper = mountFormWithInputs(
      <LoginForm {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
      testStore,
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.onSubmit).toHaveBeenCalledWith(
      { usernameEmail: "user12", loginPassword: "user12pw" },
      expect.anything(),
      expect.anything(),
    );
  });

  it("should clear password on successful submit", function () {
    const wrapper = mountFormWithInputs(
      <LoginForm {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
      testStore,
    );
    const usernameEmailNode = wrapper.find("input#usernameEmail");
    const passwordNode = wrapper.find("input#loginPassword");

    // give focus to password input (like a user would do before submit)
    // $FlowFixMe
    passwordNode.get(0).focus();
    wrapper.find("input[type='submit']").simulate("submit");

    expect(usernameEmailNode.props().value).toEqual("user12");
    expect(passwordNode.props().value).toEqual("");
    // NOTE: document.querySelector called in onSubmitSuccess works in browser but not in jest
    // expect(usernameEmailNode.get(0)).toEqual(document.activeElement);
  });

  it("should set focus to username input on render", function () {
    const wrapper = mountFormWithInputs(
      <LoginForm {...props} />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
      testStore,
    );

    expect(wrapper.find("input#usernameEmail").get(0)).toBe(document.activeElement);
  });
});
