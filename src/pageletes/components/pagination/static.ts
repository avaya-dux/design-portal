import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

type PaginationTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

const component = "pagination";
export const topics: TopicsDict<PaginationTopicNames> = {
  playground: {
    order: 0,
    id: `${component}-playground`,
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: `${component}-anatomy`,
    title: "Anatomy",
  },
  behavior: {
    order: 2,
    id: `${component}-checkbox`,
    title: "Behavior",
  },
  specs: {
    order: 3,
    id: `${component}-specs`,
    title: "Specs",
  },
  keyboard: {
    order: 4,
    id: `${component}-keyboard-interactions`,
    title: "Keyboard Interactions",
  },
  related: {
    order: 5,
    id: `${component}-related-content`,
    title: "Related Content",
  },
};
