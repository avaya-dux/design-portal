import { useState } from "react";
import { Playground } from "components/react";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@avaya/neo-react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import "./PlaygroundImplementation.css";

type LabelOption = "yes" | "no";

type OrientationOption = "vertical" | "horizontal";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox";

const sandbox = "https://codesandbox.io/s/neo-react-checkbox-kb5gbt";

export const PlaygroundImplementation = () => {
  const [orientationOption, setOrientationOption] =
    useState<OrientationOption>("vertical");
  const [labelOption, setLabelOption] = useState<LabelOption>("yes");

  const element = (
    <CheckboxGroup
      groupName="example"
      aria-labelledby="checkbox-heading"
      inline={orientationOption === "horizontal"}
    >
      <Checkbox value="one">Checkbox One</Checkbox>
      <Checkbox value="two">Checkbox Two</Checkbox>
      <Checkbox value="three">Checkbox Three</Checkbox>
    </CheckboxGroup>
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Label">
            <RadioGroup
              groupName="label-options"
              selected={labelOption}
              onChange={(e) => {
                setLabelOption(e.target.value as LabelOption);
              }}
            >
              <Radio value="yes">With Label</Radio>
              <Radio value="no">Without Label</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Orientation">
            <RadioGroup
              groupName="orientation-options"
              selected={orientationOption}
              onChange={(e) => {
                setOrientationOption(e.target.value as OrientationOption);
              }}
            >
              <Radio value="vertical">Vertical</Radio>
              <Radio value="horizontal">horizontal</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: prettyPrintReactElementToHtml(element),
        react: prettyPrintReactElementToString(element, "CheckboxGroup"),
        sandbox,
        storybook,
      }}
    >
      {element}
    </Playground>
  );
};
