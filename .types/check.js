// Hand creating meteor check libdef
declare module "meteor/check" {
  declare export function check(
    value: any,
    pattern: any,
  ): void;
}
