import type { CheckboxProps } from "@avaya/neo-react";
import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  AccordionGroup,
} from "@avaya/neo-react";
import type { SetStateAction } from "react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import { sandbox, storybook } from "../static";

type TypeOption = "single" | "stacked";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("single");
  const [open, setOpen] = useState<CheckboxProps["checked"]>(false);
  const [stackedOpenIndexes, setStackedOpenIndexes] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);
  const [disabled, setDisabled] = useState(false);

  const [element, react, html] = useMemo(() => {
    const element =
      typeOption === "single" ? (
        <Accordion
          header="Accordion Example"
          disabled={disabled}
          isOpen={open === true}
          onClick={() => setOpen(!open)}
        >
          Inner content of Accordion example
        </Accordion>
      ) : (
        <AccordionGroup>
          <Accordion
            header="Accordion 1"
            disabled={disabled}
            isOpen={stackedOpenIndexes[0]}
            onClick={() =>
              handleStackClick(
                0,
                stackedOpenIndexes,
                setStackedOpenIndexes,
                setOpen,
              )
            }
          >
            Inner content of Accordion example
          </Accordion>
          <Accordion
            header="Accordion 2"
            disabled={disabled}
            isOpen={stackedOpenIndexes[1]}
            onClick={() =>
              handleStackClick(
                1,
                stackedOpenIndexes,
                setStackedOpenIndexes,
                setOpen,
              )
            }
          >
            Inner content of Accordion example
          </Accordion>
          <Accordion
            header="Accordion 3"
            disabled={disabled}
            isOpen={stackedOpenIndexes[2]}
            onClick={() =>
              handleStackClick(
                2,
                stackedOpenIndexes,
                setStackedOpenIndexes,
                setOpen,
              )
            }
          >
            Inner content of Accordion example
          </Accordion>
        </AccordionGroup>
      );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [typeOption, open, disabled, stackedOpenIndexes]);

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

                if (e.target.value === "single" && open !== false) {
                  setOpen(true);
                } else if (e.target.value === "stacked") {
                  setOpen(false);
                  setStackedOpenIndexes([false, false, false]);
                }
              }}
            >
              <Radio value="single">Single</Radio>
              <Radio value="stacked">Stacked</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variables" id="variables">
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "open":
                    setOpen(!open);
                    setStackedOpenIndexes([!open, !open, !open]);
                    break;
                  case "disabled":
                    setOpen(false);
                    setStackedOpenIndexes([false, false, false]);
                    setDisabled(!disabled);
                    break;
                }
              }}
            >
              <Checkbox value="open" checked={open} disabled={disabled}>
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
        html,
        react,
        sandbox,
        storybook,
      }}
    >
      <div style={{ width: "100%" }}>{element}</div>
    </Playground>
  );
};

const handleStackClick = (
  index: number,
  stack: [boolean, boolean, boolean],
  setStack: React.Dispatch<SetStateAction<[boolean, boolean, boolean]>>,
  setOpen: React.Dispatch<SetStateAction<boolean | "mixed" | undefined>>,
) => {
  const newStack: [boolean, boolean, boolean] = [...stack];
  newStack[index] = !newStack[index];
  setStack(newStack);

  if (newStack.every((item) => item === true)) {
    setOpen(true);
  } else if (newStack.every((item) => item === false)) {
    setOpen(false);
  } else {
    setOpen("mixed");
  }
};
