import type { TopicsDict } from "components";

export const sandbox = "";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-notification";

type NotificationsTopicNames =
  | "playground"
  | "stateful"
  | "properties"
  | "elevation"
  | "interactions";

export const topics: TopicsDict<NotificationsTopicNames> = {
  playground: {
    order: 0,
    id: "notifications-playground",
    title: "Interactive Playground",
  },
  stateful: { order: 1, id: "notifications-stateful", title: "Stateful" },
  properties: {
    order: 2,
    id: "notifications-properties",
    title: "Properties",
  },
  elevation: { order: 3, id: "notifications-elevation", title: "Elevation" },
  interactions: {
    order: 4,
    id: "notifications-interactions",
    title: "Interactions",
  },
};
