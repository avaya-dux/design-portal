import type { TopicsDict } from "components";

export const defaultHtml = `<button class="neo-btn neo-btn-primary neo-btn-primary--default">
  default
</button>
`;
export const defaultReact = `<Button>default</Button>`;
export const sandbox = "https://codesandbox.io/s/neo-react-button-qoluzy";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-button";

type BadgeTopicNames = "playground" | "anatomy" | "usage" | "relatedContent";

export const topics: TopicsDict<BadgeTopicNames> = {
  playground: {
    order: 0,
    id: "badge-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "badge-anatomy",
    title: "Anatomy",
  },
  usage: {
    order: 2,
    id: "badge-usage",
    title: "Usage",
  },
  relatedContent: {
    order: 3,
    id: "related-content",
    title: "Related Content",
  },
};
