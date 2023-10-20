import type { TopicsDict } from "components";

type TypographyTopicNames =
  | "typescale"
  | "typographyComponents"
  | "textFormatting";

const page = "typography";
export const topics: TopicsDict<TypographyTopicNames> = {
  typescale: {
    order: 0,
    id: `${page}-typescale`,
    title: "Type Scale",
  },
  typographyComponents: {
    order: 1,
    id: `${page}-typography-components`,
    title: "Typography Components",
  },
  textFormatting: {
    order: 2,
    id: `${page}-text-formatting`,
    title: "Text Formatting",
  },
};
