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

export const moveToStart = (
  data: Array<PageAstroInstance>,
  element: string,
) => {
  const index = data.findIndex(
    (value) => value.url && value.url.indexOf(element) > -1,
  );
  if (index !== -1) {
    const ret = data.filter((_, i) => index !== i);
    ret.unshift(data[index]!);
    return ret;
  } else {
    return data;
  }
};

export const getAccessibilityPagesInOrder = (
  accessibilityPages: Array<PageAstroInstance>,
  customOrder: Array<string>,
) => {
  if (accessibilityPages.length !== customOrder.length) {
    throw new Error(
      "The number of pages in the `accessibility` section does not match the number of pages in the `customOrder` array.",
    );
  }

  const doArraysConflict = accessibilityPages.filter((page) =>
    customOrder.includes(page.url as string),
  ).length;

  if (doArraysConflict) {
    throw new Error("The expected pages do not match the actual pages.");
  }

  /**
   * NOTE: I'm using the above `if`s to ensure that the custom order matches
   * the existing pages, thus, forcing TypeScript to assume that `page.url`
   * and the `find` result always exist is safe.
   * This does look a bit hacky, but I couldn't find a cleaner way to do it.
   */
  return customOrder.map(
    (pageName) =>
      accessibilityPages.find((page) =>
        (page.url as string).includes(pageName),
      ) as PageAstroInstance,
  );
};
