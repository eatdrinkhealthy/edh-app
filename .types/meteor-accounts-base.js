// Hand creating meteor accounts base libdef
declare module "meteor/accounts-base" {
  declare export var Accounts: {
    createUser(
      options: {
        username: string,
        email: string,
        password: string,
        profile?: {},
      },
      callback?: Function,
    ): void,
    validateNewUser({}): boolean,
  }
}
