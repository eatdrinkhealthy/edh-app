// Hand creating aldeed:simple-schema libdef
declare module "meteor/aldeed:simple-schema" {
  declare export class SimpleSchema<T> {
    constructor(param: T): void;
    validator(): Function;
    validate({}): Function;
    newContext(contextName?: string): {};
    static RegEx: {
      Email: {},
    };
  }
}
