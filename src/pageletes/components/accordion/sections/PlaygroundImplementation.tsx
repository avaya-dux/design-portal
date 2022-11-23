import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { sandbox, storybook } from "../static";

type TypeOption = "single" | "stacked";

import "./PlaygroundImplementation.css";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("single");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [htmlCodeExampleExpandedIndex, setHtmlCodeExampleExpandedIndex] =
    useState(1);

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
<AccordionGroup
  allowOnlyOne
  defaultOpenAccordingIndex={1}
  header="Accordion Group Example"
>
  <Accordion header="Accordion 1" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
  <Accordion header="Accordion 2" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
  <Accordion header="Accordion 3" disabled={${disabled}}>
    Inner content of Accordion example
  </Accordion>
</AccordionGroup>
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
        <button class="neo-accordion__header-text" aria-expanded="${
          htmlCodeExampleExpandedIndex === 0
        }" aria-controls="accordion-control-accordion-one" id="accordion-one" aria-disabled="${
            htmlCodeExampleExpandedIndex === 0
          }">
          Accordion 1
        </button>
      </div>
    /div>
  </div>

  <div class="neo-accordion">
    <div class="neo-accordion__item neo-accordion__item--active">
      <div class="neo-accordion__header" role="heading" aria-label="Accordion Heading" aria-level="2">
        <button class="neo-accordion__header-text" aria-expanded="${
          htmlCodeExampleExpandedIndex === 1
        }" aria-controls="accordion-control-accordion-two" id="accordion-two" aria-disabled="${
            htmlCodeExampleExpandedIndex === 1
          }">
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
        <button class="neo-accordion__header-text" aria-expanded="${
          htmlCodeExampleExpandedIndex === 2
        }" aria-controls="accordion-control-accordion-three" id="accordion-three" aria-disabled="${
            htmlCodeExampleExpandedIndex === 2
          }">
          Accordion 3
        </button>
      </div>
    </div>
  </div>
</div>
        `);

    return [reactCode, htmlCode];
  }, [typeOption, open, disabled, htmlCodeExampleExpandedIndex]);

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
                    break;
                  case "disabled":
                    setOpen(false);
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
          isOpen={open}
          onClick={() => setOpen(!open)}
        >
          Inner content of Accordion example
        </Accordion>
      ) : (
        <div className="dpv3-accordion-stack">
          <Accordion
            header="Accordion 1"
            disabled={disabled}
            onClick={() => setHtmlCodeExampleExpandedIndex(0)}
          >
            Inner content of Accordion example
          </Accordion>
          <Accordion
            header="Accordion 2"
            disabled={disabled}
            onClick={() => setHtmlCodeExampleExpandedIndex(1)}
          >
            Inner content of Accordion example
          </Accordion>
          <Accordion
            header="Accordion 3"
            disabled={disabled}
            onClick={() => setHtmlCodeExampleExpandedIndex(2)}
          >
            Inner content of Accordion example
          </Accordion>
        </div>
      )}
    </Playground>
  );
};
