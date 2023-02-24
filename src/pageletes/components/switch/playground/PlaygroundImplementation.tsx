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

import { sandbox, storybook } from "../static";

export const defaultHtml = prettyPrintHtml(
  `<div class="neo-form-control">
  <label class="neo-switch" for="switch">
    <input id="switch" type="checkbox" role="switch">
    <i class="neo-switch__icon"></i>
    Option
  </label>
</div>`
);

export const defaultReact = `<Switch>Option</Switch>`;

export const PlaygroundImplementation = () => {
  const [withLabel, setWithLabel] = useState<string>("right");

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [react, html] = useMemo(() => {
    const isDefault =
      withLabel === "right" && isSelected === false && isDisabled === false;

    const react = prettyPrintReact(
      `
    <Switch ${clsx(
      withLabel === "none" && 'aria-label="Option"',
      withLabel === "left" && "dir='rtl'",
      isDisabled && "disabled={true}",
      isSelected && "checked={true}"
    )}>${withLabel !== "none" ? "Option" : ""}</Switch>
`
    );

    const html = prettyPrintHtml(
      `<div class="neo-form-control" ${clsx(
        withLabel === "left" && "dir='rtl'"
      )}>
      <label class="${clsx(
        "neo-switch",
        isDisabled && "neo-switch--disabled"
      )}" for="switch">
        <input id="switch" type="checkbox" role="switch" ${clsx(
          withLabel === "none" && 'aria-label="Option"',
          isSelected && "checked"
        )} >
        <i class="neo-switch__icon"></i>
        ${withLabel !== "none" ? "Option" : ""}
      </label>
    </div>`
    );

    return isDefault ? [defaultReact, defaultHtml] : [react, html];
  }, [withLabel, isSelected, isDisabled]);

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
