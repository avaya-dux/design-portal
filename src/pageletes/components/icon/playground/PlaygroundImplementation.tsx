import type { IconProps } from "@avaya/neo-react";
import {
  Icon,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReactElementToString } from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-icon-jvhyst";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-icon";

export const PlaygroundImplementation = () => {
  const [size, setSize] = useState<IconProps["size"]>("lg");
  const [status, setStatus] = useState<IconProps["status"]>("none");

  const [element, react, html] = useMemo(() => {
    const element = (
      <Icon
        aria-label="info icon"
        icon="info"
        size={size}
        status={status === "none" ? null : status}
      />
    );

    const react = prettyPrintReactElementToString(element);

    const sizeCssWord =
      size === "lg" ? "large" : size === "md" ? "medium" : "small";
    const statusCssWord = status === "none" ? "" : "-state";
    const iconSize = `neo-icon${statusCssWord}--${sizeCssWord}`;

    const html = prettyPrintHtml(
      `
      <span
        role="img"
        aria-label="info icon"
        class="${clsx(
          "neo-icon-info",
          iconSize,
          status !== "none" && `neo-icon-state--${status}`,
        )}"></span>
      `,
    );

    return [element, react, html];
  }, [size, status]);

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
              <Radio value="sm" disabled={status !== "none"}>
                Small
              </Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Status">
            <Select
              aria-label="Status"
              value={status}
              onChange={(value) => {
                setStatus(value as IconProps["status"]);
                if (value !== "none" && size === "sm") {
                  setSize("md");
                }
              }}
            >
              {["none", "available", "away", "busy"].map((value) => (
                <SelectOption key={value} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
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
      {element}
    </Playground>
  );
};
