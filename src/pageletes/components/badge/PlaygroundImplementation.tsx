import { Badge, BadgeProps, TextInput } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components";

import { sandbox, storybook } from "../buttons/static";

// const defaultHtml = `
//   <div>
//     <span class="neo-badge" data-badge="7" aria-label="badge with 7 items"></span>
//   </div>
// `;
// export const defaultReact = `  <Badge
//     aria-label="badge with 27 items"
//     data="27"
//   />`;
// export const sandbox = "https://codesandbox.io/s/neo-react-button-qoluzy";
// export const storybook =
//   "https://neo-react-library-storybook.netlify.app/?path=/story/components-button";

export const PlaygroundImplementation = () => {
  const [data, setData] = useState<BadgeProps["data"]>("27");
  // const [ariaLabel, setAriaLabel] = useState<BadgeProps["aria-label"]>(
  //   "badge with 27 items"
  // );


  const react = useMemo(
    () =>
      `<Badge
        aria-label="this is a badge"
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
          aria-label="this is a badge"
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
            <TextInput label="badge value"
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
