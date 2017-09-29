declare module "meteor/mdg:validation-error" {
  declare export type IValidationErrorDetail = {
    name: string,
    type: string,
    message?: string,
    value?: string | boolean | number,
    dataType?: string,
    min?: number,
    max?: number,
  };

  declare export class ValidationError {
    constructor(errors: Array<IValidationErrorDetail>, message?: string): IValidationError;

    errorType: string | number;
    name: string;
    error: string;
    details: Array<IValidationErrorDetail>;
    static is(any): boolean;
  }
}
