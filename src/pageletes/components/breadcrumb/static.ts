import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/";

type BreadcrumbTopicNames =
	| "playground"
	| "anatomy"
	| "states"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

export const topics: TopicsDict<BreadcrumbTopicNames> = {
	playground: {
		order: 0,
		id: "breadcrumb-playground",
		title: "Interactive Playground",
	},
	anatomy: { order: 1, id: "breadcrumb-anatomy", title: "Anatomy" },
	states: { order: 2, id: "breadcrumb-type", title: "States" },
	behavior: { order: 3, id: "breadcrumb-behavior", title: "Behavior" },
	specs: {
		order: 4,
		id: "breadcrumb-specs",
		title: "Specs",
	},
	keyboard: {
		order: 5,
		id: "breadcrumb-keyboard-interactions",
		title: "Keyboard Interactions",
	},
	related: {
		order: 6,
		id: "breadcrumb-related-content",
		title: "Related Content",
	},
};
