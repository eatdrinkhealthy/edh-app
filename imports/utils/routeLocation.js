/* eslint-disable flowtype/no-types-missing-file-annotation */
import queryString from "query-string";
import type { Location } from "react-router-dom";

export const searchObject = (
  location: ?Location,
): {} => {
  const searchStr = location && location.search;
  const searchObj = { ...(searchStr && queryString.parse(searchStr)) };

  return searchObj;
};

export const searchProperty = (
  location: ?Location,
  property: string,
): undefined | string | Array<*> => {
  const searchObj = searchObject(location, property);

  return searchObj[property];
};
