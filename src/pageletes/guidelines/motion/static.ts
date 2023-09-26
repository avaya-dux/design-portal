import type { TopicsDict } from "components";

type MotionTopicNames = "easing" | "duration" | "accessibility";

export const topics: TopicsDict<MotionTopicNames> = {
  easing: {
    order: 0,
    id: "motion-easing",
    title: "Easing",
  },
  duration: { order: 1, id: "motion-duration", title: "Duration" },
  // TODO: Uncomment when Interactive Widget is implemented.
  // examples: {
  //   order: 2,
  //   id: "motion-examples",
  //   title: "Motion Effect Examples",
  // },
  accessibility: {
    order: 3,
    id: "motion-accesibility",
    title: "Accessibility",
  },
};
