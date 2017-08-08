// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import CreateAccount from "../CreateAccount";

describe("<CreateAccount />", function () {
  it("matches render snapshot", function () {
    const tree = renderer.create(
      <CreateAccount handleSubmit={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call handleSubmit on submit with form field values", function () {
    const props = {
      handleSubmit: jest.fn(),
    };

    // Had a lot of difficulty here, trying to figure out how to set the value of
    // an input field. This test is much more valid, if you can set the input field,
    // it updates state, then state is used to provide params for handleSubmit (true
    // round trip).
    //
    // I had seen several examples of updating the input value by doing
    // wrapper.find("selector").simulate("change", {target: {value: "user12"}});
    //
    // But that wouldn't work here for some reason. Ended up finding another example
    // where you set the value of the node, then call simulate (to trigger state update
    // I presume)
    // https://github.com/airbnb/enzyme/issues/364 (May 6th comment)
    //
    // Note, I am getting flow warnings, that get(0).value is not a property of
    // React$Element. Perhaps that is exposing an underlying problem with how this
    // is implemented.

    const wrapper = mount(<CreateAccount {...props} />);

    const usernameInput = wrapper.find("[name='username']");
    const emailInput = wrapper.find("[name='email']");
    const passwordInput = wrapper.find("[name='password']");
    const confirmPasswordInput = wrapper.find("[name='confirmPassword']");

    // $FlowFixMe
    usernameInput.get(0).value = "user12";
    usernameInput.simulate("change", usernameInput);

    // $FlowFixMe
    emailInput.get(0).value = "user12@test.com";
    emailInput.simulate("change", emailInput);

    // $FlowFixMe
    passwordInput.get(0).value = "user12pw";
    passwordInput.simulate("change", passwordInput);

    // $FlowFixMe
    confirmPasswordInput.get(0).value = "user12pw";
    confirmPasswordInput.simulate("change", confirmPasswordInput);

    wrapper.find("input[type='submit']").simulate("submit");
    expect(props.handleSubmit).toHaveBeenCalledWith("user12", "user12@test.com", "user12pw");
  });
});
