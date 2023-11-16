import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { type SetStateAction, useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { sandbox, storybook } from "../static";

type TypeOption = "single" | "stacked";

import "./PlaygroundImplementation.css";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("single");
  const [open, setOpen] = useState<CheckboxProps["checked"]>(false);
  const [stackedOpenIndexes, setStackedOpenIndexes] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);
  const [disabled, setDisabled] = useState(false);

  const [react, html] = useMemo(() => {
    const reactCode =
      typeOption === "single"
        ? prettyPrintReact(`
<Accordion
  header="Single Accordion Example"
  disabled={${disabled}}
  isOpen={${open}}
  onClick={() => setOpen(!open)}
>
  Inner content of Accordion example
</Accordion>`)
        : prettyPrintReact(`
<div>
  <Accordion header="Accordion 1" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
  <Accordion header="Accordion 2" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
  <Accordion header="Accordion 3" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
</div>
      `);

    const htmlCode =
      typeOption === "single"
        ? prettyPrintHtml(`
<div class="neo-accordion">
  <div class="neo-accordion__item">
    <div
      class="neo-accordion__header"
      role="heading"
      aria-label="Accordion Heading"
      aria-level="2"
    >
      <button
        class="neo-accordion__header-text"
        aria-expanded="${open}"
        aria-controls="accordion-control-accordion-button"
        id="accordion-button"
      >
        Single Accordion Example
      </button>
    </div>

    ${
      open
        ? `
    <div id="accordion-control-accordion-button" class="neo-accordion__body">
      <div class="neo-accordion__content">
        Inner content of Accordion example
      </div>
    </div>
    `
        : ""
    }
  </div>
</div>
      `)
        : prettyPrintHtml(`
<div class="neo-accordion-group">
  <p>Accordion Group Example</p>

  <div class="neo-accordion">
    <div class="neo-accordion__item">
      <div class="neo-accordion__header" role="heading" aria-label="Accordion Heading" aria-level="2">
        <button class="neo-accordion__header-text" aria-expanded="${stackedOpenIndexes[0]}" aria-controls="accordion-control-accordion-one" id="accordion-one" aria-disabled="${stackedOpenIndexes[0]}">
          Accordion 1
        </button>
      </div>
    /div>
  </div>

  <div class="neo-accordion">
    <div class="neo-accordion__item neo-accordion__item--active">
      <div class="neo-accordion__header" role="heading" aria-label="Accordion Heading" aria-level="2">
        <button class="neo-accordion__header-text" aria-expanded="${stackedOpenIndexes[1]}" aria-controls="accordion-control-accordion-two" id="accordion-two" aria-disabled="${stackedOpenIndexes[1]}">
          Accordion 2
        </button>
      </div>

      <div id="accordion-control-accordion-two" class="neo-accordion__body">
        <div class="neo-accordion__content">
          Inner content of Accordion example
        </div>
      </div>
    </div>
  </div>

  <div class="neo-accordion">
    <div class="neo-accordion__item">
      <div class="neo-accordion__header" role="heading" aria-label="Accordion Heading" aria-level="2">
        <button class="neo-accordion__header-text" aria-expanded="${stackedOpenIndexes[2]}" aria-controls="accordion-control-accordion-three" id="accordion-three" aria-disabled="${stackedOpenIndexes[2]}">
          Accordion 3
        </button>
      </div>
    </div>
  </div>
</div>
        `);

    return [reactCode, htmlCode];
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
      {typeOption === "single" ? (
        <Accordion
          header="Single Accordion Example"
          disabled={disabled}
          isOpen={open === true}
          onClick={() => setOpen(!open)}
        >
          Inner content of Accordion example
        </Accordion>
      ) : (
        <div className="dpv3-accordion-stack">
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
        </div>
      )}
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
