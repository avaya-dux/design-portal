import { useState, useCallback } from "react";
import { Playground } from "components/react";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@avaya/neo-react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

type LabelOption = "yes" | "no";

type OrientationOption = "vertical" | "horizontal";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox";

const sandbox = "https://codesandbox.io/s/neo-react-checkbox-kb5gbt";

export const PlaygroundImplementation = () => {
  const [labelOption, setLabelOption] = useState<LabelOption>("yes");

  const [orientationOption, setOrientationOption] =
    useState<OrientationOption>("vertical");

  const createChildren = useCallback(() => {
    if (labelOption === "yes") {
      return (
        <>
          <Checkbox value="one">Checkbox Label</Checkbox>
          <Checkbox value="two">Checkbox Label</Checkbox>
          <Checkbox value="three">Checkbox Label</Checkbox>
        </>
      );
    } else {
      return (
        <>
          <Checkbox value="one" aria-label="Checkbox Label" />
          <Checkbox value="two" aria-label="Checkbox Label" />
          <Checkbox value="three" aria-label="Checkbox Label" />
        </>
      );
    }
  }, [labelOption]);

  const element = (
    <CheckboxGroup
      groupName="example"
      label="Checkbox Heading"
      inline={orientationOption === "horizontal"}
    >
      {createChildren().props.children}
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
        react: prettyPrintReactElementToString(element),
        sandbox,
        storybook,
      }}
    >
      {element}
    </Playground>
  );
};
