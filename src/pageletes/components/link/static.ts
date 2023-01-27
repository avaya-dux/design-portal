import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const sandbox = "http://to.do";
export const storybook = "http://to.do";

export const defaultHtml = prettyPrintHtml(`
  <div> 
  todo
  </div>
  `);

export const defaultReact = prettyPrintReact(`
    <div>todo<div>
  `);

type LinkTopicNames =
  | "playground"
  | "standalone"
  | "inline"
  | "keyboard"
  | "related";

export const topics: TopicsDict<LinkTopicNames> = {
  playground: {
    order: 0,
    id: "link-playground",
    title: "Interactive Playground",
  },
  standalone: { order: 1, id: "link-standalone", title: "Standalone Link" },
  inline: { order: 2, id: "link-inline", title: "Inline Link" },
  keyboard: {
    order: 3,
    id: "link-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 4,
    id: "link-related-content",
    title: "Related Content",
  },
};
