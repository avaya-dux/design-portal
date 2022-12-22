import {
  Icon,
  IconProps,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
  TextInput,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";
import clsx from "clsx";

const defaultLabel = "Save Icon";
const sandbox =
  "https://codesandbox.io/s/neo-react-icon-jvhyst?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-icon";

export const PlaygroundImplementation = () => {
  const [icon, setIcon] = useState<IconProps["icon"]>("email");
  const [label, setLabel] = useState<IconProps["aria-label"]>(defaultLabel);
  const [size, setSize] = useState<IconProps["size"]>("lg");
  const [status, setStatus] = useState<IconProps["status"]>("available");

  const react = useMemo(
    () =>
      prettyPrintReact(
        `<Icon aria-label="${label}" icon="${icon}" size="${size}" status="${status}" />`
      ),
    [icon, label, size, status]
  );

  const html = useMemo(
    () =>
      prettyPrintHtml(
        `<span
        role="img"
        aria-label="${label}"
        class="${clsx(
          "neo-icon-state",
          size === "lg" && "neo-icon-state--large",
          `neo-icon-state--${status}`,
          `neo-icon-${icon}`
        )}"
        ></span>`
      ),
    [icon, label, size, status]
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
              {["menu", "table", "email"].map((value) => (
                <SelectOption key={value} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Status">
            <Select
              aria-label="Status"
              value={status}
              onChange={(value) => setStatus(value as IconProps["status"])}
            >
              {["available", "away", "busy"].map((value) => (
                <SelectOption key={value} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Size">
            <RadioGroup
              groupName="size-options"
              selected={size}
              onChange={(e) => {
                setSize(e.target.value as IconProps["size"]);
              }}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Aria Label">
            <TextInput
              aria-label="Aria Label"
              defaultValue={label}
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
      <Icon aria-label={label} icon={icon} size={size} status={status} />
    </Playground>
  );
};
