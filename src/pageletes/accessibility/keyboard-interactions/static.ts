import type { TopicsDict } from "components";

type KeyboardInteractionsTopicNames =
  | "accordion";

const component = "testing-tools";
export const topics: TopicsDict<KeyboardInteractionsTopicNames> = {
  accordion: {
    order: 0,
    id: `${component}-accordion`,
    title: "Accordion",
  },
};
