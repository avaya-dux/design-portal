import { elementToStaticHtml } from "@avaya/neo-react";
import toDiffableHtml from "diffable-html";

import type { ReactElement } from "react";
import type { Options } from "react-element-to-jsx-string";
import reactElementToJSXString from "react-element-to-jsx-string";
import type { PageAstroInstance } from "./types";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
  return elementToStaticHtml(element);
};

export const prettyPrintReactElementToString = (
  element: React.ReactElement,
  options?: Options,
) => {
  return reactElementToJSXString(element, options);
};

/**
 * Prefer using `prettyPrintReactElementToHtml` instead.
 * @see prettyPrintReactElementToHtml
 */
export const prettyPrintHtml = (html: string) => {
  return toDiffableHtml(html).trim();
};

/**
 * Prefer using `prettyPrintReactElementToString` instead.
 * @deprecated
 * @see prettyPrintReactElementToString
 */
export const prettyPrintReact = (react: string) => {
  return react.trim();
};

export const moveToStart = (data: Array<PageAstroInstance>, element: string) => {
  const index = data.findIndex((value) => value.url && value.url.indexOf(element) > -1);
  if (index !== -1) {
    const ret = data.filter((_, i) => index !== i);
    ret.unshift(data[index]!);
    return ret;
  } else {
    return data
  }
};
