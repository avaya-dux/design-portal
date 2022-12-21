import {
  Icon,
  IconProps,
  Select,
  SelectOption,
  TextInput,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

const defaultLabel = "Save Icon";
const sandbox =
  "https://codesandbox.io/s/neo-react-icon-jvhyst?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-icon";

export const PlaygroundImplementation = () => {
  const [icon, setIcon] = useState<IconProps["icon"]>("info");
  const [label, setLabel] = useState<IconProps["aria-label"]>(defaultLabel);

  const react = useMemo(
    () => `<Icon icon="${icon}" aria-label="${label}" />`,
    [icon, label]
  );

  const html = useMemo(
    () =>
      `<div class="neo-empty-state">
  <p class="neo-icon-${icon}">${label}</p>
</div>`,
    [icon, label]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Icon">
            <Select
              aria-label="Icon"
              value={icon}
              onChange={(value) => setIcon(value as IconProps["icon"])}
            >
              {["info", "warning", "error"].map((value) => (
                <SelectOption key={value} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Text">
            <TextInput
              aria-label="Text"
              onChange={(e) => setLabel(e.target.value || defaultLabel)}
            />
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
      <Icon
        aria-label="Testing size xs"
        className="btn-icon-test another-class"
        icon="save"
        size="sm"
        status="busy"
      />
    </Playground>
  );
};
