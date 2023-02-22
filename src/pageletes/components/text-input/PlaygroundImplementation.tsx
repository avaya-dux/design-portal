import type { TextInputProps } from "@avaya/neo-react";
import { Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import { useMemo, useState } from "react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { Playground } from "components";

import { sandbox, storybook } from "./static";

type TypeOption = "text" | "password";
type LabelOption = "optional" | "required" | "none";
const label = "Label";

export const PlaygroundImplementation = () => {
  const [labelOption, setLabelOption] = useState<LabelOption>("optional");
  const [required, setRequired] = useState<TextInputProps["required"]>(false);
  const [helperText, setHelperText] =
    useState<TextInputProps["helperText"]>("Helper text");
  const [error, setError] = useState<TextInputProps["error"]>(false);
  const [typeOption, setTypeOption] = useState<TypeOption>("text");


  const [html, react] = useMemo(() => {
    const htmlCode = prettyPrintHtml(
      `
<div class="neo-form-control">
  <div class="neo-input-group">
    <label htmlFor="input1">
      Name
    </label>
    <div class="neo-input-editable__wrapper">
      <input
        class="neo-input"
        id="input1"
        type="${typeOption}"
      />
      <button aria-label="clear input" tabindex='-1' class="neo-input-edit__icon neo-icon-end"></button>
    </div>
  </div>
  <div class="neo-input-hint">${helperText}</div>
</div>
`
    );

    const reactCode = prettyPrintReact(

      `<TextInput type="${typeOption}" label="Label" helperText="${helperText}"> </TextInput>`);
    return [htmlCode, reactCode];
  },
    [helperText, typeOption]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type-options"
              selected={typeOption}
              onChange={(e) => {
                setTypeOption(e.target.value as TypeOption);
              }}
            >
              <Radio value="text">Text</Radio>
              <Radio value="password">Password</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Value">
            <RadioGroup
              groupName="value-options"
              selected={labelOption}
              onChange={(e) => {
                setLabelOption(e.target.value as LabelOption);

                if (e.target.value === "optional") {
                  setRequired(false);
                  setError(false);
                  setHelperText("Helper text");
                } else {
                  setRequired(true);
                  setError(true);
                  setHelperText("This field is required");
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
        html: html,
        react: react,
        sandbox,
        storybook,
      }}
    >
      <TextInput
        label="Label"
        type={typeOption}
        helperText={helperText}
        required={required}
        error={error}
      ></TextInput>
    </Playground>
  );
};
