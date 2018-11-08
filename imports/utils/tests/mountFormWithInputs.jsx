// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import type { ReactWrapper } from "enzyme";
import type { Store } from "redux";
import _ from "lodash";

// NOTE: mountCreateAccountForm used to be exported from CreateAccountForm.jest.jsx,
//       but whenever it was imported in to another module (e.g. CreateAccountContainer.jest.jsx)
//       it would generate a snapshot file for the file it was imported to (but
//       generate a snapshot of <CreateAccountForm />)
//       Moving mountCreateAccountForm to its own module resolved that.
//
//       Weird.

const mountFormWithInputs = ( // eslint-disable-line
  formComponent: React$Element<*>,
  inputs: {},
  store?: Store<*, *>, // if a store is provided, mount with a <Provider /> and store
): ReactWrapper => {
  //
  // Had a lot of difficulty here, trying to figure out how to set the value of
  // an input field. I had seen several examples of updating the input value by doing
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
  //
  // Also note: tests are much more valid, if you can the input fields,
  // which updates state, then state is used to provide params for handleSubmit (true
  // round trip).
  //

  const wrapper = store
    ? mount(<Provider store={store}>{formComponent}</Provider>) // for redux-form forms
    : mount(formComponent); // for standard forms

  _.forIn(inputs, (value, input) => {
    const inputWrapper = wrapper.find(`[name='${input}']`);

    if (inputWrapper.length) {
      // $FlowFixMe
      inputWrapper.get(0).value = value;
      inputWrapper.simulate("change", inputWrapper);
    }
  });

  return wrapper;
};

export default mountFormWithInputs;
