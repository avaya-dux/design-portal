import toDiffableHtml from "diffable-html";
import type { ReactElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import type { Options } from "react-element-to-jsx-string";
import reactElementToJSXString from "react-element-to-jsx-string";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
  return prettyPrintHtml(ReactDOMServer.renderToStaticMarkup(element));
};

/**
 * This function converts a React element to a string in JSX format with optional formatting options.
 * @param {ReactElement} element - The React element that you want to convert to a string
 * representation. This can be any valid React element, including functional components, class
 * components, and JSX elements.
 * @param {Options} [options] - The `options` parameter is an optional object that can be passed to the
 * `prettyPrintReactElementToString` function to customize the output of the JSX string. It can include
 * the following properties:
 * @returns The function `prettyPrintReactElementToString` returns a string representation of a React
 * element in JSX syntax, using the `react-element-to-jsx-string` library. The function takes two
 * parameters: `element`, which is the React element to be converted to a string, and `options`, which
 * is an optional object containing configuration options for the conversion.
 */
export const prettyPrintReactElementToString = (
  element: ReactElement,
  options?: Options
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
