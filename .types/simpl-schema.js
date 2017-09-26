// Hand creating aldeed:simple-schema libdef
declare module "simpl-schema" {
  declare export default class SimpleSchema<T> {
    constructor(param: T): void;
    validator(): Function;
    validate({}): Function;
    namedContext(contextName?: string): SimpleSchema<T>;
    static RegEx: {
      Email: {},
    };
  }
}
