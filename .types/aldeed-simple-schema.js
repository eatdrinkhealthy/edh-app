// Hand creating aldeed:simple-schema libdef
declare module "meteor/aldeed:simple-schema" {
  declare export class SimpleSchema {
    validator(): Function;
  }
}
