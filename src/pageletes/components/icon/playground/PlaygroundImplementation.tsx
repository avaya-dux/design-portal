import { Icon, IconProps, Radio, RadioGroup } from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-icon-tywncu";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-icon--standard-icon-sm";

export const PlaygroundImplementation = () => {
  const [size, setSize] = useState<IconProps["size"]>("md");

  const [react, html] = useMemo(() => {
    const react = prettyPrintReact(
      `
    <Icon aria-label="info icon" icon="info" size="${size}"/>
`
    );

    const html = prettyPrintHtml(
      `
      <span class="${clsx(
        "neo-icon-info",
        size === "sm" && "neo-icon--small",
        size === "md" && "neo-icon--medium",
        size === "lg" && "neo-icon--large"
      )}"></span>
      `
    );

    return [react, html];
  }, [size]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Size">
            <RadioGroup
              groupName="size"
              selected={size}
              onChange={(e) => {
                setSize(e.target.value as IconProps["size"]);
              }}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>
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
      <Icon aria-label="info-icon" icon="info" size={size}></Icon>
    </Playground>
  );
};
