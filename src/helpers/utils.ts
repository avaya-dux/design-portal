import toDiffableHtml from "diffable-html";

import type { ReactElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import reactElementToJSXString from "react-element-to-jsx-string";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
  return prettyPrintHtml(ReactDOMServer.renderToStaticMarkup(element));
};

export const prettyPrintReactElementToString = (
  element: ReactElement,
  displayName: string
) => {
  return reactElementToJSXString(element, {
    displayName: () => displayName,
  });
};

export const prettyPrintHtml = (html: string) => {
  return toDiffableHtml(html).trim();
};

/** deprecated */
export const prettyPrintReact = (react: string) => {
  return react.trim();
};
