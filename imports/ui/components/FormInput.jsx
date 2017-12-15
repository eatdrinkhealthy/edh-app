// @flow
import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from "./ReactBootstrapLib";

type IRenderInputProps = {
  inputId: string,
  autoFocus: boolean,
  label: string,
  type: string,
  input: {},          // redux-form flow type
  meta: {             // redux-form flow type
    touched: boolean, // eslint-disable-line react/no-unused-prop-types
    error: string,    // eslint-disable-line react/no-unused-prop-types
  },
};

const FormInput = (
  { input, inputId, autoFocus, label, type, meta: { touched, error } }: IRenderInputProps,
) => {
  const validationState = touched && !!error ? "error" : null;

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <FormGroup controlId={inputId} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input} type={type} autoFocus={autoFocus} />
      {touched && error && <HelpBlock id={`${inputId}Error`}>{error}</HelpBlock>}
    </FormGroup>
  );
  /* eslint-enable jsx-a11y/no-autofocus */
};

export default FormInput;
