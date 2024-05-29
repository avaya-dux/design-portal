import type { TopicsDict } from "components";

type ColorTopicNames =
	| "principles"
	| "library"
	| "how"
	| "data"
	| "accessibility";

const component = "color";
export const topics: TopicsDict<ColorTopicNames> = {
	principles: {
		order: 0,
		id: `${component}-principles`,
		title: "Principles",
	},
	library: {
		order: 2,
		id: `${component}-library`,
		title: "Color Library",
	},
	how: {
		order: 3,
		id: `${component}-how`,
		title: "How to Use",
	},
	data: {
		order: 4,
		id: `${component}-data`,
		title: "Data Colors",
	},
	accessibility: {
		order: 5,
		id: `${component}-accessibility`,
		title: "Accessibility",
	},
};
