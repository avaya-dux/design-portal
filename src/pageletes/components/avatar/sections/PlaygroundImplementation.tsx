import {
  Avatar,
  Radio,
  RadioGroup,
  Select,
  AvatarProps,
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
type SizeOption = "sm" | "md" | "lg";
type StatusOption = "none" | "available" | "away" | "busy" | "offline" | "do-not-disturb";

export const PlaygroundImplementation = () => {
  const [type, setType] = useState<TypeOption>("generic");
  const [sizeOption, setSizeOption] = useState<SizeOption>("md");
  const [statusOption, setStatusOption] = useState<StatusOption>("none");
  const [initialsValue, setInitialsValue] = useState<initialsValue>("");
  const [image, setImage] = useState<image>(null);

  const getVariant = (type: TypeOption) => {
    const strType = type as string;
    if (strType === "image") {
      setImage(avatarImg);
      setInitialsValue("");
      return "generic";
    }

    setImage(null);

    if (strType === "initials") {
      setInitialsValue("TC"); // Setting to arbitrary "TC" value
    } else {
      setInitialsValue("");
    }

    return strType;
  };

  const [element, react, html] = useMemo(() => {
    const variant = getVariant(type);
    let props: AvatarProps = {
      variant: variant,
      size: sizeOption,
      status: statusOption,
    };

    if (initialsValue) {
      props = { ...props, initials: initialsValue }
    }

    if (image) {
      props = { ...props, image }
    }

    const element = <Avatar {...props} />;
    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [type, sizeOption, statusOption, initialsValue, image]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Avatar Type"
              value={type}
              onChange={(value: string) => {
                setType(value as TypeOption);
              }}
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
              selected={sizeOption}
              onChange={(e: { target: { value: string } }) => {
                setSizeOption(e.target.value as SizeOption);
              }}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">large</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Right Side">
            <RadioGroup
              groupName="status-options"
              selected={statusOption}
              onChange={(e: { target: { value: string } }) => {
                console.log(e.target.value);
                setStatusOption(e.target.value as StatusOption);
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
