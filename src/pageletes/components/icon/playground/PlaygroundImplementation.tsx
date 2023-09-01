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
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-icon-jvhyst";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-icon";

type StatusType = "Icon" | "Icon with Status";

export const PlaygroundImplementation = () => {
  const [type, setType] = useState<StatusType>("Icon");
  const [size, setSize] = useState<IconProps["size"]>("lg");
  const [status, setStatus] = useState<IconProps["status"]>("available");

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

    const html = prettyPrintReactElementToHtml(element);

    return [element, react, html];
  }, [size, status]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Type"
              value={type}
              onChange={(value: StatusType) => {
                if (value === "Icon with Status" && size === "sm") {
                  setSize("md");
                }

                setType(value);
              }}
            >
              <SelectOption key="Icon" value="Icon">
                Icon
              </SelectOption>

              <SelectOption key="Icon with Status" value="Icon with Status">
                Icon with Status
              </SelectOption>
            </Select>
          </Playground.OptionsSection>

          {/*
            HACK: if I hide the "Small" radio button, styling breaks or the logic
            inside of the react component breaks. Having to do this hack to get it
            working as Matt wants it.
          */}
          <Playground.OptionsSection title="Size">
            <div className={clsx(type === "Icon with Status" && "hidden")}>
              <RadioGroup
                groupName="size-for-icon-with-status"
                selected={size}
                onChange={(e) => setSize(e.target.value as IconProps["size"])}
              >
                <Radio value="sm">Small</Radio>
                <Radio value="md">Medium</Radio>
                <Radio value="lg">Large</Radio>
              </RadioGroup>
            </div>

            <div className={clsx(type === "Icon" && "hidden")}>
              <RadioGroup
                groupName="size-for-icon-without-status"
                selected={size}
                onChange={(e) => setSize(e.target.value as IconProps["size"])}
              >
                <Radio value="md">Medium</Radio>
                <Radio value="lg">Large</Radio>
              </RadioGroup>
            </div>
          </Playground.OptionsSection>

          {type === "Icon with Status" && (
            <Playground.OptionsSection title="Status">
              <RadioGroup
                groupName="status"
                selected={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Radio value="available">Available</Radio>
                <Radio value="away">Away</Radio>
                <Radio value="busy">Busy</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
          )}
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
