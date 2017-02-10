/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import cheerio from "cheerio";
import _ from "lodash";
import { mount } from "enzyme";

export function formattedJSON(item) {
  return JSON.stringify(item, null, 2);
}

export function notFoundStatus(className) {
  return Object.assign({ className }, { status: "not found" });
}

export function htmlClassList(htmlString) {
  const $ = cheerio.load(htmlString);
  let classList = [];

  $("*").each(function () {
    const elemClasses = $(this).attr("class"); // attr returns undefined when not found
    if (elemClasses) {
      classList = _.union(classList, _.compact(elemClasses.split(" ")));
    }   // compact removes any empty strings caused by extra spaces around multiple classNames
  });

  return classList;
}

export function componentClassNameList(currComponent) {
  const mountedHTML = mount(currComponent).html(); // might be able to use shallow here
  return htmlClassList(mountedHTML);
}

export function getStyleObject(className, stylesObj) {
  const styleKey = _.findKey(stylesObj, obj => (obj.className === className));
  return stylesObj[styleKey] || notFoundStatus(className);
}

export function getStyleObjectList(classNameList, styles) {
  return classNameList.map(className => (getStyleObject(className, styles)));
}

export function getAllComponentStyle(currComponent, styles) {
  const classNameList = componentClassNameList(currComponent);
  return getStyleObjectList(classNameList, styles);
}
