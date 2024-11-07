import type { TopicsDict } from "components";

type PaginationTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "states"
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
	states: {
		order: 3,
		id: `${component}-states`,
		title: "States",
	},
	specs: {
		order: 4,
		id: `${component}-specs`,
		title: "Specs",
	},
	keyboard: {
		order: 5,
		id: `${component}-keyboard-interactions`,
		title: "Keyboard Interactions",
	},
	related: {
		order: 6,
		id: `${component}-related-content`,
		title: "Related Content",
	},
};
