import { Spinner, SpinnerProps, Select, SelectOption } from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "./static";

export const PlaygroundImplementation = () => {
  const [size, setSize] = useState<SpinnerProps["size"]>("md");

  const isDefault = useMemo(() => size === "md", [size]);

  const react = useMemo(() => `<Spinner size="${size}"></Spinner>`, [size]);

  const html = useMemo(
    () =>
      `<div
  class="${clsx(
    "neo-spinner",
    size === "lg" && "neo-spinner--large",
    size === "xl" && "neo-spinner--x-large"
  )}"
></div>`,
    [size]
  );

  return (
    <div className="global-margin global-margin--bottom">
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Size">
              <Select
                aria-label="Spinner Size"
                value={size || "md"}
                onChange={(value) => setSize(value as SpinnerProps["size"])}
              >
                <SelectOption value="md">Medium</SelectOption>
                <SelectOption value="lg">Large</SelectOption>
                <SelectOption value="xl">Extra Large</SelectOption>
              </Select>
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          html: isDefault ? defaultHtml : html,
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        <Spinner size={size || "md"}></Spinner>
      </Playground>
    </div>
  );
};
