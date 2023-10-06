import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import "./PlaygroundImplementation_shim.css";

export const sandbox = "https://codesandbox.io/s/neo-react-switch-eeb2m1";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-switch--default";

export const PlaygroundImplementation = () => {
  const [withLabel, setWithLabel] = useState<string>("right");

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const isDefault = withLabel === "right" && !isSelected && !isDisabled;

  const [react, html] = useMemo(() => {
    const react = prettyPrintReact(
      `
    <Switch${!isDefault ? " " : ""}${clsx(
      withLabel === "none" && 'aria-label="Option"',
      withLabel === "left" && "dir='rtl'",
      isDisabled && "disabled",
      isSelected && "checked",
    )}>${withLabel !== "none" ? "Option" : ""}</Switch>
`,
    );

    const html = prettyPrintHtml(
      `<div class="neo-form-control" ${clsx(
        withLabel === "left" && "dir='rtl'",
      )}>
      <label class="${clsx(
        "neo-switch",
        isDisabled && "neo-switch--disabled",
      )}" for="switch">
        <input id="switch" type="checkbox" role="switch" ${clsx(
          withLabel === "none" && 'aria-label="Option"',
          isSelected && "checked",
          isDisabled && "disabled",
        )} />
        <i class="neo-switch__icon"></i>
        ${withLabel !== "none" ? "Option" : ""}
      </label>
    </div>`,
    );

    return [react, html];
  }, [withLabel, isSelected, isDisabled, isDefault]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Label">
            <RadioGroup
              groupName="label"
              selected={withLabel}
              onChange={(e) => {
                setWithLabel(e.target.value);
              }}
            >
              <Radio value="none">None</Radio>
              <Radio value="right">Right</Radio>
              <Radio value="left">Left</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Variables">
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "selected":
                    setIsSelected(!isSelected);
                    break;
                  case "disabled":
                    setIsDisabled(!isDisabled);
                    break;
                }
              }}
            >
              <Checkbox value="selected" checked={isSelected}>
                Selected
              </Checkbox>

              <Checkbox value="disabled" checked={isDisabled}>
                Disabled
              </Checkbox>
            </CheckboxGroup>
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
      <Switch
        aria-label={withLabel === "none" ? "Option" : ""}
        dir={withLabel === "left" ? "rtl" : "ltr"}
        disabled={isDisabled}
        checked={isSelected}
        onClick={() => setIsSelected(!isSelected)}
      >
        {withLabel !== "none" && "Option"}
      </Switch>
    </Playground>
  );
};
