import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";

const sandbox = "https://codesandbox.io/";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-select--basic-selects";

export const fruitOptions = [
  <SelectOption value="apple" key="apple">
    Apple
  </SelectOption>,
  <SelectOption value="gravel" key="gravel" helperText="Not a Fruit" disabled>
    Gravel
  </SelectOption>,
  <SelectOption value="broccoli" key="broccoli" helperText="Vegetable">
    Broccoli
  </SelectOption>,
  <SelectOption value="banana" key="banana">
    Banana
  </SelectOption>,
  <SelectOption value="pear" key="pear">
    Pear
  </SelectOption>,
  <SelectOption value="blueberries" key="blueberries">
    Blueberries
  </SelectOption>,
  <SelectOption value="grapes" key="grapes">
    Grapes
  </SelectOption>,
  <SelectOption value="oranges" key="oranges">
    Oranges
  </SelectOption>,
];

export const PlaygroundImplementation = () => {
  const [multiple, setMultiple] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasVisibleLabel, setHasVisibleLabel] = useState(true);
  const [hasHelperText, setHasHelperText] = useState(true);

  const [react, html] = useMemo(() => {
    return ["reactCode", "htmlCode"];
  }, []);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Type of Select"
              defaultValue="single"
              onChange={(value) => {
                setMultiple(value === "multiple");
              }}
            >
              <SelectOption value="single">Single</SelectOption>
              <SelectOption value="multiple">Multiple</SelectOption>
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection
            id="select-state-options-title"
            title="States"
          >
            <CheckboxGroup
              groupName="select-state-options"
              aria-labelledby="select-state-options-title"
            >
              <Checkbox value="error" onChange={() => setHasError(!hasError)}>
                Error
              </Checkbox>
              <Checkbox
                value="disabled"
                onChange={() => setIsDisabled(!isDisabled)}
              >
                Disabled
              </Checkbox>
            </CheckboxGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection
            id="select-state-variables-title"
            title="Variables"
          >
            <CheckboxGroup
              groupName="select-state-variables"
              aria-labelledby="select-state-variables-title"
            >
              <Checkbox
                value="label"
                checked={hasVisibleLabel}
                onChange={() => setHasVisibleLabel(!hasVisibleLabel)}
              >
                Label
              </Checkbox>
              <Checkbox
                value="helper-text"
                checked={hasHelperText}
                onChange={() => setHasHelperText(!hasHelperText)}
              >
                Helper Text
              </Checkbox>
            </CheckboxGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Size">
            <RadioGroup
              groupName="select-size"
              onChange={() => null}
              selected="medium"
            >
              <Radio value="small">Small</Radio>
              <Radio value="medium">Medium</Radio>
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
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <Select
          multiple={multiple}
          errorList={hasError ? ["Invalid selection"] : []}
          disabled={isDisabled}
          helperText={hasHelperText ? "Please select one" : undefined}
          label={hasVisibleLabel ? "Select a favorite food" : undefined}
          aria-label={!hasVisibleLabel ? "Select a favorite food" : ""}
        >
          {fruitOptions}
        </Select>
      </div>
    </Playground>
  );
};
