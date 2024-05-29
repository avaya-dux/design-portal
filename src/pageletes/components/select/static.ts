import type { TopicsDict } from "components";

type DropdownTopicNames =
	| "playground"
	| "anatomy"
	| "states"
	| "type"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

export const topics: TopicsDict<DropdownTopicNames> = {
	playground: {
		order: 0,
		id: "select-playground",
		title: "Interactive Playground",
	},
	anatomy: { order: 1, id: "select-anatomy", title: "Anatomy" },
	states: { order: 2, id: "select-states", title: "States" },
	type: { order: 3, id: "select-type", title: "Type" },
	behavior: { order: 4, id: "select-behavior", title: "Behavior" },
	specs: { order: 5, id: "select-specs", title: "Specs" },
	keyboard: {
		order: 6,
		id: "select-keyboard-interactions",
		title: "Keyboard Interactions",
	},
	related: {
		order: 7,
		id: "select-related-content",
		title: "Related Content",
	},
};
