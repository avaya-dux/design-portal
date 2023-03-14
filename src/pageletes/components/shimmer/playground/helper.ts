import clsx from "clsx";

import { prettyPrintHtml } from "helpers/utils";

export const getClassName = (loop: boolean, shape: string, size: string) =>
  clsx(
    "neo-shimmer",
    shape === "rectangle" && size === "sm" && "neo-shimmer__rectangle sm",
    shape === "rectangle" && size === "md" && "neo-shimmer__rectangle",
    shape === "rectangle" && size === "lg" && "neo-shimmer__rectangle lg",
    shape === "circle" && size === "sm" && "neo-shimmer__circle--small",
    shape === "circle" && size === "md" && "neo-shimmer__circle--medium",
    shape === "circle" && size === "lg" && "neo-shimmer__circle--large",
    loop === false && "neo-shimmer--3-count"
  );

export const createReactString = (
  loop: boolean,
  shape: string,
  size: string
) => {
  const loopAttr = loop ? "loopInfinitely" : undefined;
  const sizeAttr = size === "md" ? undefined : `size="${size}"`;
  const shapeAttr = shape === "rectangle" ? undefined : `shape="${shape}"`;
  return clsx("<Shimmer", loopAttr, sizeAttr, shapeAttr, "/>");
};

export const createHtmlString = (
  loop: boolean,
  shape: string,
  size: string
) => {
  return prettyPrintHtml(`<div
  aria-busy="true"
  aria-live="polite"
  role="alert"
  class="${getClassName(loop, shape, size)}"
></div>`);
};
