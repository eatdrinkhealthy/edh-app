// Hand creating meteor-http libdef
declare module "meteor/http" {
  declare export type IHttpResult = {
    statusCode: ?number,
    content: string,
    data: ?{},
    headers: {},
  };

  declare export var HTTP: {
    call: (
      method: string,
      url: string,
      options?: {},
      asyncCallback?: () => void,
    ) => IHttpResult,
  };
}
