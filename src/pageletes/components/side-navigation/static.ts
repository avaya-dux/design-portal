import type { TopicsDict } from "components";

type SideNavTopicNames =
	| "playground"
	| "anatomy"
	| "states"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

export const topics: TopicsDict<SideNavTopicNames> = {
	playground: {
		order: 0,
		id: "sidenav-playground",
		title: "Interactive Playground",
	},
	anatomy: { order: 1, id: "sidenav-anatomy", title: "Anatomy" },
	states: { order: 2, id: "sidenav-states", title: "States" },
	behavior: { order: 4, id: "sidenav-behavior", title: "Behavior" },
	specs: {
		order: 5,
		id: "sidenav-specs",
		title: "Specs",
	},
	keyboard: {
		order: 6,
		id: "sidenav-keyboard",
		title: "Keyboard Interactions",
	},
	related: {
		order: 7,
		id: "sidenav-related-content",
		title: "Related Content",
	},
};
