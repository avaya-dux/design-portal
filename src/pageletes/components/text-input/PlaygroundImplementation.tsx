import type { TextInputProps } from "@avaya/neo-react";
import { Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import { useMemo, useState } from "react";
import { prettyPrintReact } from "helpers";

import { Playground } from "components";

import { sandbox, storybook } from "./static";
import clsx from "clsx";

type TypeOption = "text" | "password";
type LabelOption = "optional" | "required" | "none";

export const PlaygroundImplementation = () => {
  const [labelOption, setLabelOption] = useState<LabelOption>("optional");
  const [required, setRequired] = useState<TextInputProps["required"]>(false);
  const [inputValue, setInputValue] = useState<TextInputProps["value"]>("");
  const [helperText, setHelperText] =
    useState<TextInputProps["helperText"]>("Helper text");
  const [error, setError] = useState<TextInputProps["error"]>(false);
  const [typeOption, setTypeOption] = useState<TypeOption>("text");

  const [html, react] = useMemo(() => {
    const htmlCode = `
<div class="neo-form-control" ${clsx(
      error && " neo-form-control--error  neo-form-control--required",
    )}>
  <div class="neo-input-group">
    <label for="input1">
      Name
    </label>
    <div class="neo-input-editable__wrapper">
      <input
        class="neo-input"
        id="input1"
        aria-describedby="text-hint"
        type="${typeOption}"
    />
      <button aria-label="clear input" class="neo-input-edit__icon neo-icon-end"></button>
      ${clsx(
        typeOption === "password" &&
          '<button aria-label="Show Password" aria-pressed="false" class="neo-icon-view-on" type="button"></button>',
      )}
    </div>
  </div>
  <div id="text-hint" class="neo-input-hint" ${clsx(
    error && ' aria-live="assertive"',
  )}>${helperText}</div>
</div>
`;

    const reactCode = prettyPrintReact(
      `<TextInput
  type="${typeOption}"
  label="Label"
  helperText="${helperText}"
  required="${required}"
  error="${error}"
/>`,
    );
    return [htmlCode, reactCode];
  }, [error, helperText, required, typeOption]);

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
                  setInputValue("");
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
        html,
        react,
        sandbox,
        storybook,
      }}
    >
      <TextInput
        label="Label"
        value={inputValue}
        type={typeOption}
        helperText={helperText}
        required={required}
        error={error}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(false);
        }}
      />
    </Playground>
  );
};
