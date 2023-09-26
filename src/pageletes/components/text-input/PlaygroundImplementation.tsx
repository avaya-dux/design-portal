import type { TextInputProps } from "@avaya/neo-react";
import { Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import { useState } from "react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import { Playground } from "components";

const sandbox =
  "https://codesandbox.io/s/neo-react-textinput-gl5x9k?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-text-input--default";

type InputType = "true" | "false";
type ToggleHelperText = "on" | "off";
type TextSize = "default" | "small";

export const PlaygroundImplementation = () => {
  const [inputType, setInputType] = useState<InputType>("true");
  const [toggleHelperText, setToggleHelperText] =
    useState<ToggleHelperText>("on");
  const [textSize, setTextSize] = useState<TextSize>("default");
  const [helperText, setHelperText] =
    useState<TextInputProps["helperText"]>("Additional content");

  const element = (
    <TextInput
      label="Label"
      type="text"
      helperText={helperText}
      required={Boolean(inputType)}
    />
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Input Value">
            <RadioGroup
              groupName="type-options"
              selected={inputType}
              onChange={(e) => {
                setInputType(e.target.value as InputType);
                e.target.value == "true"
                  ? setInputType("true")
                  : setInputType("false");
              }}
            >
              <Radio value="false">Optional</Radio>
              <Radio value="true">Required</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Helper Text">
            <RadioGroup
              groupName="value-options"
              selected={toggleHelperText}
              onChange={(e) => {
                setToggleHelperText(e.target.value as ToggleHelperText);
                e.target.value == "on"
                  ? setHelperText("Additional content")
                  : setHelperText("");
              }}
            >
              <Radio value="on">On</Radio>
              <Radio value="off">Off</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Size">
            <RadioGroup
              groupName="size-options"
              selected={textSize}
              onChange={(e) => {
                setTextSize(e.target.value as TextSize);
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="small">Small</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: prettyPrintReactElementToHtml(element),
        react: prettyPrintReactElementToString(element),
        sandbox,
        storybook,
      }}
    >
      {element}
    </Playground>
  );
};
