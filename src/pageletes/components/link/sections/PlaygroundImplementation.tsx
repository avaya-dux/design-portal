/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { sandbox, storybook } from "../static";

type TypeOption = "standalone" | "inline";

type IconPlacement = "none" | "left" | "right";

import "./PlaygroundImplementation.css";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("standalone");
  const [iconPlacement, setIconPlacement] = useState<IconPlacement>("none");
  const [disabled, setDisabled] = useState(false);

  const [react, html] = useMemo(() => {
    const reactCode = prettyPrintReact(`
  <div>
  </div>
        `);

    const htmlCode = prettyPrintHtml(`
          <div></div>
          `);

    return [reactCode, htmlCode];
  }, [typeOption, iconPlacement, disabled]);

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

                if (e.target.value === "standalone") {
                  // enable checkbox group
                } else {
                  // disable checkbox group
                }
              }}
            >
              <Radio value="standalone">Standalone</Radio>
              <Radio value="inline">Inline</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variants" id="icon-placement">
            <RadioGroup
              groupName="icon-placement"
              selected={iconPlacement}
              onChange={(e) => {
                setIconPlacement(e.target.value as IconPlacement);
              }}
            >
              <Radio value="none">No Icon</Radio>
              <Radio value="left">Icon on Left</Radio>
              <Radio value="right">Icon on Right</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Variables" id="variables">
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                if (value === "disabled") {
                  setDisabled(!disabled);
                }
              }}
            >
              <Checkbox value="disabled" checked={disabled}>
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
      <a href="#">Link</a>
    </Playground>
  );
};
