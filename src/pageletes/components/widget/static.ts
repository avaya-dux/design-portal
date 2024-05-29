import type { TopicsDict } from "components";

type WidgetTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

const component = "widget";

export const topics: TopicsDict<WidgetTopicNames> = {
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
		id: `${component}-behavior`,
		title: "Behavior",
	},
	specs: {
		order: 3,
		id: `${component}-specs`,
		title: "Specs",
	},
	keyboard: {
		order: 4,
		id: `${component}-keyboard`,
		title: "Keyboard Interactions",
	},
	related: {
		order: 5,
		id: `${component}-related`,
		title: "Related Content",
	},
};
