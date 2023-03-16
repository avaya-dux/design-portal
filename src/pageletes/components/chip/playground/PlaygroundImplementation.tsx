import {
  Checkbox,
  Chip,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips";

type ChipTypeOption = "default" | "info" | "success" | "alert" | "warning";

type ChipVariantOption = "default" | "icon" | "avatar";

type ChipVariableOption = "default" | "removable";

export const PlaygroundImplementation = () => {
  const [chipType, setChipType] = useState<ChipTypeOption>("default");
  const [chipVariant, setChipVariant] = useState<ChipVariantOption>("default");
  const [chipVariable, setChipVariable] =
    useState<ChipVariableOption>("default");
  const [disabled, setDisabled] = useState(false);

  const [component, react, html] = useMemo(() => {
    const element = (
      <Chip
        variant={chipType}
        closable={chipVariable === "removable"}
        disabled={disabled}
        avatarInitials={clsx(chipVariant === "avatar" && "EX")}
        icon={clsx(chipVariant === "icon" && "info")}
      >
        Example
      </Chip>
    );

    return [
      element,
      prettyPrintReactElementToString(element, { displayName: () => "Chip" }),
      prettyPrintReactElementToHtml(element),
    ];
  }, [chipType, chipVariant, chipVariable, disabled]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="Chip Types"
              onChange={(value) => setChipType(value as ChipTypeOption)}
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
              <Radio value="expandable">Expandable</Radio>
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
      {component}
    </Playground>
  );
};
