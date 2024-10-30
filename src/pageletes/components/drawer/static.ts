import type { TopicsDict } from "components";

type DrawerTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "specs"
	| "keyboard";

const component = "drawer";
export const topics: TopicsDict<DrawerTopicNames> = {
	playground: {
		order: 0,
		id: `${component}-interactive-playground`,
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
	specs: {
		order: 3,
		id: `${component}-specs`,
		title: "Specs",
	},
	keyboard: {
		order: 4,
		id: `${component}-keyboard-interactions`,
		title: "Keyboard Interactions",
	},
};
