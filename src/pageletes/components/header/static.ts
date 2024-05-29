import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/";

type HeaderTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "specs"
	| "keyboard"
	| "related";

export const topics: TopicsDict<HeaderTopicNames> = {
	playground: {
		order: 0,
		id: "header-playground",
		title: "Interactive Playground",
	},
	anatomy: { order: 1, id: "header-anatomy", title: "Anatomy" },
	behavior: { order: 2, id: "header-behavior", title: "Behavior" },
	specs: { order: 3, id: "header-specs", title: "Specs" },
	keyboard: { order: 4, id: "header-keyboard", title: "Keyboard Interactions" },
	related: {
		order: 5,
		id: "header-related-content",
		title: "Related Content",
	},
};
