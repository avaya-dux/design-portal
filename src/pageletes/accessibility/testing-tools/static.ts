import type { TopicsDict } from "components";

type TestingToolsTopicNames =
  | "screenReaders"
  | "colorCheckers"
  | "accessibilityCheckers";

const component = "testing-tools";
export const topics: TopicsDict<TestingToolsTopicNames> = {
  screenReaders: {
    order: 0,
    id: `${component}-screen-readers`,
    title: "Screen Readers",
  },
  colorCheckers: {
    order: 1,
    id: `${component}-color-checkers`,
    title: "Color Contrast Checkers",
  },
  accessibilityCheckers: {
    order: 2,
    id: `${component}-accessibility-checkers`,
    title: "Automated Accessibility Checkers",
  },
};
