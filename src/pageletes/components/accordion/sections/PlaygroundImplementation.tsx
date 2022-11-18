import {
  Accordion,
  AccordionGroup,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useState } from "react";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

type TypeOption = "single" | "group";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("single");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Types">
            <RadioGroup
              groupName="type-options"
              selected={typeOption}
              onChange={(e) => {
                setTypeOption(e.target.value as TypeOption);
              }}
            >
              <Radio value="single">Single</Radio>
              <Radio value="group">Group</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection
            title="Variables"
            id="variables"
            className="hack-hide-me"
          >
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "open":
                    setOpen(!open);
                    break;
                  case "disabled":
                    setDisabled(!disabled);
                    break;
                }
              }}
            >
              <Checkbox value="open" checked={open}>
                Open
              </Checkbox>
              <Checkbox value="disabled" checked={disabled}>
                Disabled
              </Checkbox>
            </CheckboxGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: defaultHtml,
        react: defaultReact,
        sandbox,
        storybook,
      }}
    >
      {typeOption === "single" ? (
        <Accordion header="Single Accordion Example">
          Inner content of Accordion example
        </Accordion>
      ) : (
        <AccordionGroup>
          <Accordion header="Accordion Group Example 1">
            Inner content of Accordion example
          </Accordion>
          <Accordion header="Accordion Group Example 2">
            Inner content of Accordion example
          </Accordion>
          <Accordion header="Accordion Group Example 3">
            Inner content of Accordion example
          </Accordion>
        </AccordionGroup>
      )}
    </Playground>
  );
};
