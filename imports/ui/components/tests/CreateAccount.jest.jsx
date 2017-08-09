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
    const tree = renderer.create(
      <CreateAccount handleSubmit={() => {}} />,
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
});
