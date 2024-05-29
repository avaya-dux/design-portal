import type { TopicsDict } from "components";

type LinkTopicNames =
	| "playground"
	| "type"
	| "behavior"
	| "keyboard"
	| "related";

export const topics: TopicsDict<LinkTopicNames> = {
	playground: {
		order: 0,
		id: "link-playground",
		title: "Interactive Playground",
	},
	type: { order: 1, id: "link-type", title: "Type" },
	behavior: { order: 2, id: "link-behavior", title: "Behavior" },
	keyboard: {
		order: 3,
		id: "link-keyboard-interactions",
		title: "Keyboard Interactions",
	},
	related: {
		order: 4,
		id: "link-related-content",
		title: "Related Content",
	},
};
