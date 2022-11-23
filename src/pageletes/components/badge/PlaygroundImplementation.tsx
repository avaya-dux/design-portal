import { Badge, BadgeProps, TextInput } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components";

// import { sandbox } from "../buttons/static";

const sandbox =
  "https://codesandbox.io/s/neo-react-badge-forked-zjf97s?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-badge--freefloating-badge";

export const PlaygroundImplementation = () => {
  const [data, setData] = useState<BadgeProps["data"]>("27");

  const react = useMemo(
    () =>
      `<Badge
        aria-label="badge with 27 items"
        data="27"
        >

      </Badge>`,
    []
  );
  const html = useMemo(
    () =>
      `<div>
        <span
          class="neo-badge"
          data={${data}}
          aria-label="badge with 27 items"
        >
        </span>
      </div>`,
    [data]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Size">
            <TextInput
              label="badge value"
              onChange={(e) => setData(e.target.value as BadgeProps["data"])}
            ></TextInput>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: html,
        react: react,
        sandbox,
        storybook,
      }}
    >
      <Badge data={data || ""} aria-label="where is this rendered"></Badge>
    </Playground>
  );
};
