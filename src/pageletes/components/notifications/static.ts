import type { TopicsDict } from "components";

type NotificationsTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "type"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

const component = "notifications";

export const topics: TopicsDict<NotificationsTopicNames> = {
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
  states: {
    order: 2,
    id: `${component}-states`,
    title: "States",
  },
  type: {
    order: 3,
    id: `${component}-type`,
    title: "Type",
  },
  behavior: {
    order: 4,
    id: `${component}-behavior`,
    title: "Behavior",
  },
  specs: { order: 5, id: `${component}-specs`, title: "Specs" },
  keyboard: {
    order: 6,
    id: `${component}-keyboard-interactions`,
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: `${component}-related-content`,
    title: "Related Content",
  },
};
