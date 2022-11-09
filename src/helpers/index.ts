import toDiffableHtml from "diffable-html";

export const prettyPrintHtml = (html: string) => {
  return toDiffableHtml(html).trim();
};

export const prettyPrintReact = (react: string) => {
  return react.trim();
};
