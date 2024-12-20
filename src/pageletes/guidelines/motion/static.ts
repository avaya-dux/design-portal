import type { TopicsDict } from "components";

type MotionTopicNames = "easing" | "duration" | "examples" | "accessibility";

export const topics: TopicsDict<MotionTopicNames> = {
	easing: {
		order: 0,
		id: "motion-easing",
		title: "Easing",
	},
	duration: { order: 1, id: "motion-duration", title: "Duration" },
	examples: {
		order: 2,
		id: "motion-examples",
		title: "Motion Effect Examples",
	},
	accessibility: {
		order: 3,
		id: "motion-accesibility",
		title: "Accessibility",
	},
};
