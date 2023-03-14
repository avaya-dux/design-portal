import { type ReactElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import reactElementToJSXString from "react-element-to-jsx-string";
import toDiffableHtml from "diffable-html";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
  return prettyPrintHtml(ReactDOMServer.renderToStaticMarkup(element));
};


export const prettyPrintReactElementToString = (
  element: ReactElement,
) => {
  return reactElementToJSXString(element);
};

export const prettyPrintHtml = (html: string) => {
  return toDiffableHtml(html).trim();
};

/** deprecated */
export const prettyPrintReact = (react: string) => {
  return react.trim();
};
