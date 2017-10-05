declare type IValidationErrorDetail = {
  name: string,
  type: string,
  message?: string,
  value?: string | boolean | number | {},
  dataType?: string,
  min?: number,
  max?: number,
};

declare type IValidationError = {
  errorType: string | number,
  name: string,
  error: "validation-error",
  details: Array<IValidationErrorDetail>,
};
