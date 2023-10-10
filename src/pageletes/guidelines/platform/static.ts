import type { TopicsDict } from "components";

type PlatformTopicNames = "web" | "ios" | "android" | "windows" | "mac";

const component = "platform";
export const topics: TopicsDict<PlatformTopicNames> = {
  web: {
    order: 0,
    id: `${component}-web`,
    title: "Web",
  },
  ios: {
    order: 1,
    id: `${component}-ios`,
    title: "iOS",
  },
  android: {
    order: 2,
    id: `${component}-andriod`,
    title: "Android",
  },
  windows: {
    order: 3,
    id: `${component}-windows`,
    title: "Windows",
  },
  mac: {
    order: 4,
    id: `${component}-mac`,
    title: "Mac",
  },
};
