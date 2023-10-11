import type { TopicsDict } from "components";

type PlatformTopicNames = "platform" | "web" | "ios" | "android" | "windows" | "mac";

const component = "platform";
export const topics: TopicsDict<PlatformTopicNames> = {
  platform: {
    order: 0,
    id: `${component}`,
    title: "Platform",
  },
  web: {
    order: 1,
    id: `${component}-web`,
    title: "Web",
  },
  ios: {
    order: 2,
    id: `${component}-ios`,
    title: "iOS",
  },
  android: {
    order: 3,
    id: `${component}-andriod`,
    title: "Android",
  },
  windows: {
    order: 4,
    id: `${component}-windows`,
    title: "Windows",
  },
  mac: {
    order: 5,
    id: `${component}-mac`,
    title: "Mac",
  },
};
