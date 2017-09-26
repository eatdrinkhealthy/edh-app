declare type IValidationErrorDetail = {
  name: string,
  value: string,
  type: string,
  dataType: string,
  message: string,
};

declare class IValidationError {
  constructor(error: Array<IValidationErrorDetail>, message?: string): IValidationError;

  errorType: string | number;
  name: string;
  error: string;
  details: Array<IValidationErrorDetail>;
  is?: (any) => boolean;
};

