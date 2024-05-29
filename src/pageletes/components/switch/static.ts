import type { TopicsDict } from "components";

type SwitchTopicNames =
	| "playground"
	| "anatomy"
	| "states"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

export const topics: TopicsDict<SwitchTopicNames> = {
	playground: {
		order: 0,
		id: "switch-playground",
		title: "Interactive Playground",
	},
	anatomy: {
		order: 1,
		id: "switch-anatomy",
		title: "Anatomy",
	},
	states: {
		order: 2,
		id: "switch-states",
		title: "States",
	},
	behavior: {
		order: 3,
		id: "switch-behavior",
		title: "Behavior",
	},
	specs: {
		order: 4,
		id: "switch-specs",
		title: "Specs",
	},
	keyboard: {
		order: 5,
		id: "switch-keyboard",
		title: "Keyboard Interactions",
	},
	related: {
		order: 6,
		id: "switch-related",
		title: "Related Content",
	},
};
