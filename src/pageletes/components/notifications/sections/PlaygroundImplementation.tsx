import {
  Notification,
  Radio,
  RadioGroup,
  Select,
  NotificationProps,
  SelectOption,
} from "@avaya/neo-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import { Playground } from "components";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox =
  "https://codesandbox.io/s/neo-react-notifications-dcplsu?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-notification";

type TypeOption = "info" | "success" | "warning" | "alert" | "event";
type LineOption = "one" | "two";
type RightSideOption = "close" | "timer" | "button";

const getIcon = (type: TypeOption) => {
  switch (type) {
    case "event":
      return "copy";
    case "success":
      return "check";
    default:
      return type;
  }
};

const getHeader = (type: TypeOption) => {
  const s = type as string;
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const getDescription = (type: TypeOption, rightSideOption: RightSideOption) => {
  if (rightSideOption == "timer") {
    return "A timer display";
  }

  if (rightSideOption == "button") {
    return "Two custom actions";
  }

  switch (type) {
    case "info":
      return "An info with close action";
    case "success":
      return "A success with close action";
    case "warning":
      return "A warning with close action";
    case "alert":
      return "An alert with close action";
    case "event":
      return "An event with close action";
    default:
      return "";
  }
};

const getAction = (
  rightSideOption: RightSideOption,
  setClosed: Dispatch<SetStateAction<boolean>>,
) => {
  switch (rightSideOption) {
    case "close":
      return {
        onClick: () => {
          alert("Close Clicked");
          setClosed(true);
        },
      };
    case "timer":
      return { count: "12:34:56" };
    default:
      return {
        buttons: [
          { children: "Edit", onClick: () => alert("Edit Clicked") },
          { children: "Alert", onClick: () => alert("Alert Clicked") },
        ],
      };
  }
};

export const PlaygroundImplementation = () => {
  const [type, setType] = useState<TypeOption>("info");
  const [lineOption, setLineOption] = useState<LineOption>("one");
  const [rightSideOption, setRightSideOption] =
    useState<RightSideOption>("close");
  const [closed, setClosed] = useState(false);

  const [element, react, html] = useMemo(() => {
    const icon = getIcon(type);
    const action = getAction(rightSideOption, setClosed);
    const description = getDescription(type, rightSideOption);
    let props: NotificationProps = { type, icon, description, action };
    const header = getHeader(type);
    if (lineOption == "two") {
      props = { ...props, header };
    }
    const element = <Notification {...props} />;
    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [type, lineOption, rightSideOption, setClosed]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Notification Type"
              value={type}
              onChange={(value: string) => {
                setType(value as TypeOption);
                setClosed(false);
              }}
            >
              <SelectOption value="info">Info</SelectOption>
              <SelectOption value="success">Success</SelectOption>
              <SelectOption value="warning">Warning</SelectOption>
              <SelectOption value="alert">Alert</SelectOption>
              <SelectOption value="event">Event</SelectOption>
            </Select>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Line of texts">
            <RadioGroup
              groupName="line-of-texts"
              selected={lineOption}
              onChange={(e: { target: { value: string } }) => {
                setLineOption(e.target.value as LineOption);
                setClosed(false);
              }}
            >
              <Radio value="one">1</Radio>
              <Radio value="two">2</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Right Side">
            <RadioGroup
              groupName="right-side-options"
              selected={rightSideOption}
              onChange={(e: { target: { value: string } }) => {
                console.log(e.target.value);
                setRightSideOption(e.target.value as RightSideOption);
                setClosed(false);
              }}
            >
              <Radio value="button">Button</Radio>
              <Radio value="timer">Timer</Radio>
              <Radio value="close">Close</Radio>
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
      <div style={{ width: "100%" }}>{closed ? null : element}</div>
    </Playground>
  );
};
