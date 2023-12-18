import type { AvatarProps } from "@avaya/neo-react";
import {
  Avatar,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox =
  "https://codesandbox.io/s/neo-react-avatar-forked-ktyvjv?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-avatar--avatar-with-status-indicator";

import avatarImg from "../imgs/avatarImg.png";

type TypeOption = "generic" | "image" | "bot" | "initials";

export const PlaygroundImplementation = () => {
  const [type, setType] = useState<TypeOption>("generic");
  const [size, setSize] = useState<AvatarProps["size"]>("md");
  const [status, setStatus] = useState<AvatarProps["status"] | "none">("none");

  const [element, react, html] = useMemo(() => {
    const variant: AvatarProps["variant"] =
      type === "bot" || type === "generic" ? type : undefined;
    const element = (
      <Avatar
        size={size}
        status={status as AvatarProps["status"]}
        variant={variant}
        label="Joey Joe Joe Jr."
        initials={type === "initials" ? "TS" : undefined}
        image={type === "image" ? avatarImg.src : undefined}
      />
    );
    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [type, size, status]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Avatar Type"
              value={type}
              onChange={(value) => setType(value as TypeOption)}
            >
              <SelectOption value="generic">Generic</SelectOption>
              <SelectOption value="image">Image</SelectOption>
              <SelectOption value="bot">Bot</SelectOption>
              <SelectOption value="initials">Initials</SelectOption>
            </Select>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Size">
            <RadioGroup
              groupName="size"
              selected={size}
              onChange={(e: { target: { value: string } }) => {
                setSize(e.target.value as AvatarProps["size"]);
              }}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Status Icon">
            <RadioGroup
              groupName="status-options"
              selected={status}
              onChange={(e: { target: { value: string } }) => {
                setStatus(e.target.value as AvatarProps["status"]);
              }}
            >
              <Radio value="none">None</Radio>
              <Radio value="available">Available</Radio>
              <Radio value="away">Away</Radio>
              <Radio value="busy">Busy</Radio>
              <Radio value="offline">Offline</Radio>
              <Radio value="do-not-disturb">Do Not Disturb</Radio>
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
      {element}
    </Playground>
  );
};
