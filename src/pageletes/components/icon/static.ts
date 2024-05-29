import type { TopicsDict } from "components";

type IconTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "specs"
	| "related";

export const topics: TopicsDict<IconTopicNames> = {
	playground: {
		order: 0,
		id: "icon-playground",
		title: "Interactive Playground",
	},
	anatomy: {
		order: 1,
		id: "icon-anatomy",
		title: "Anatomy",
	},
	behavior: {
		order: 2,
		id: "icon-behavior",
		title: "Behavior",
	},
	specs: {
		order: 3,
		id: "icon-specs",
		title: "Specs",
	},
	related: {
		order: 4,
		id: "icon-related",
		title: "Related Content",
	},
};
