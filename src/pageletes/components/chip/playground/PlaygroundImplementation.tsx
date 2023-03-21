import {
  Checkbox,
  Chip,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";

import type { ChipProps } from "@avaya/neo-react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { Playground } from "components";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips";

type ChipVariantOption = "default" | "icon" | "avatar";

type ChipVariableOption = "default" | "removable";

export const PlaygroundImplementation = () => {
  const [chipType, setChipType] = useState<ChipProps["variant"]>("default");
  const [chipVariant, setChipVariant] = useState<ChipVariantOption>("default");
  const [chipVariable, setChipVariable] =
    useState<ChipVariableOption>("default");
  const [disabled, setDisabled] = useState(false);

  const [component, react, html] = useMemo(() => {
    const element = (
      <Chip
        variant={chipType}
        closable={chipVariable === "removable"}
        onClose={() => setElementToRender(<></>)}
        disabled={disabled}
        avatarInitials={clsx(chipVariant === "avatar" && "EX")}
        icon={clsx(chipVariant === "icon" && "info")}
      >
        Example
      </Chip>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [chipType, chipVariant, chipVariable, disabled]);

  const [elementToRender, setElementToRender] = useState(component);

  useEffect(() => {
    setElementToRender(component);
  }, [chipType, chipVariant, chipVariable, disabled]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Chip Types"
              onChange={(value) => setChipType(value as ChipProps["variant"])}
              defaultValue="default"
            >
              <SelectOption value="default">Default</SelectOption>
              <SelectOption value="info">Info</SelectOption>
              <SelectOption value="success">Success</SelectOption>
              <SelectOption value="alert">Alert</SelectOption>
              <SelectOption value="warning">Warning</SelectOption>
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="State">
            <Checkbox
              value="disabled"
              checked={disabled}
              onChange={() => setDisabled(!disabled)}
            >
              Disable
            </Checkbox>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variants">
            <RadioGroup
              groupName="variants"
              selected={chipVariant}
              onChange={(e) => {
                setChipVariant(e.target.value as ChipVariantOption);
              }}
            >
              <Radio value="default">None</Radio>
              <Radio value="icon">Icon</Radio>
              <Radio value="avatar">Avatar</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variables">
            <RadioGroup
              groupName="variables"
              selected={chipVariable}
              onChange={(e) => {
                setChipVariable(e.target.value as ChipVariableOption);
              }}
            >
              <Radio value="default">None</Radio>
              <Radio value="removable">Removable</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        react,
        html,
        sandbox,
        storybook,
      }}
    >
      {elementToRender}
    </Playground>
  );
};
