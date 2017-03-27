// Hand creating react-router-redux libdef, currently for v4

declare module "react-router-redux" {
  declare export function syncHistoryWithStore(history: Object, store: Object): Object;
  declare export function routerReducer(): Object;
}
