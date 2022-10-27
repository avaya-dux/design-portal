export interface Topic {
  id: string;
  title: string;
  order: number;
}

export type TopicsDict<T extends string> = {
  [key in T]: Topic;
};

export const topicsSortedByOrder = (
  topics: TopicsDict<string> // TODO: use generic type
): Topic[] => {
  const links: Topic[] = Array(Object.keys(topics).length);
  Object.keys(topics).forEach((key) => {
    const item = topics[key] as Topic;
    links[item.order] = { ...item };
  });

  return links;
};
