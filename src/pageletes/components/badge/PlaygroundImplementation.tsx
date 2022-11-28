import { Badge, BadgeProps, TextInput } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-badge-forked-zjf97s";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-badge";

export const PlaygroundImplementation = () => {
  const [data, setData] = useState<BadgeProps["data"]>("27");

  const react = prettyPrintReact(
    `<Badge
      aria-label="badge with 27 items"
      data="27"
      >
</Badge>`
  );
  const html = prettyPrintHtml(
    `<div>
      <span
        class="neo-badge"
        data={${data}}
        aria-label="badge with 27 items"
      >
      </span>
    </div>`
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
        html,
        react,
        sandbox,
        storybook,
      }}
    >
      <Badge data={data || ""} aria-label="text with badge">
        Text with badge
      </Badge>
    </Playground>
  );
};
