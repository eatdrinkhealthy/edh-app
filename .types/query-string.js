declare module "query-string" {
  declare var queryString: {
    parse: (searchString: string, options?: {}) => string,
    stringify: (searchObject: {}, options?: {}) => string,
    extract: (urlString: string) => string,
  };

  declare export default typeof queryString;
}
