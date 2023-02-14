import { Radio, RadioGroup, TextInput, TextInputProps } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { sandbox, storybook } from "./static";

type LabelOption = "optional" | "required" | "none";

export const PlaygroundImplementation = () => {
  const [labelOption, setLabelOption] = useState<LabelOption>("optional");
  const [required, setRequired] = useState<TextInputProps["required"]>(false);
  const [label, setLabel] = useState<TextInputProps["label"]>("Label");

  const react = useMemo(
    () => `<TextInput label=${label} helperText="Helper text"> </TextInput>`,
    [label]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Value">
            <RadioGroup
              groupName="type-options"
              selected={labelOption}
              onChange={(e) => {
                setLabelOption(e.target.value as LabelOption);

                if (e.target.value === "optional") {
                  setRequired(false);
                } else if (e.target.value === "required") {
                  setRequired(true);
                } else {
                  setLabel(undefined);
                }
              }}
            >
              <Radio value="optional">Optional</Radio>
              <Radio value="required">Required</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: react,
        react: react,
        sandbox,
        storybook,
      }}
    >
      <TextInput
        label={label} helperText="Helper text" required={required}>
      </TextInput>
    </Playground>
  );
};
