import toDiffableHtml from "diffable-html";

import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Options } from "react-element-to-jsx-string";
import reactElementToJSXString from "react-element-to-jsx-string";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
  return prettyPrintHtml(renderToStaticMarkup(element));
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
