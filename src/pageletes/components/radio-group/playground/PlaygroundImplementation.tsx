import { Form, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import clsx from "clsx";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

export const PlaygroundImplementation = () => {
  const [withLabel, setWithLabel] = useState<string>("withLabel");

  const [isVertical, setIsVertical] = useState<string>("isVertical");

  const [selectedExampleRadio, setSelectedExampleRadio] = useState<string>("");

  const [react, html] = useMemo(() => {
    const isDefault =
      withLabel === "withLabel" &&
      isVertical === "isVertical" &&
      selectedExampleRadio === "";

    const labelAttr =
      withLabel === "withLabel" ? "label='Select Option'" : undefined;

    const inlineAttr = isVertical === "isNotVertical" ? "inline" : undefined;

    const reactCode = prettyPrintReact(
      `
<Form id="radio-form">
  <RadioGroup
    ${clsx("groupName='Default Radio Group'", labelAttr, inlineAttr)}
    selected={selectedExampleRadio}
    onChange={(e) => setSelectedExampleRadio(e.target.value)}
  >
    <Radio value="Calendar">Calendar</Radio>
    <Radio value="Calculator">Calculator</Radio>
    <Radio value="Notes">Notes</Radio>
  </RadioGroup>
</Form>
`
    );

    const htmlCode = prettyPrintHtml(
      `
      <form class="neo-form">
  <div class="neo-form-control">
    <div class="neo-input-group${
      isVertical === "isNotVertical" ? "neo-input-group--inline" : ""
    }">
      ${
        withLabel === "withLabel"
          ? '<label for="Default Radio Group">Select Option</label>'
          : ""
      }
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Calendar"
        id="calendar"
        role="radio"
        aria-checked=${selectedExampleRadio === "Calendar"}
      />
      <label for="calendar">Calendar</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Calculator"
        id="calculator"
        role="radio"
        aria-checked=${selectedExampleRadio === "Calculator"}
      />
      <label for="calculator">Calculator</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Notes"
        id="notes"
        role="radio"
        aria-checked=${selectedExampleRadio === "Notes"}
      />
      <label for="notes">Notes</label>
      </div>
  </div>
</form>
`
    );

    return isDefault ? [defaultReact, defaultHtml] : [reactCode, htmlCode];
  }, [isVertical, withLabel, selectedExampleRadio]);

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
              <Radio value="withLabel">With Label</Radio>
              <Radio value="withoutLabel">Without Label</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Orientation">
            <RadioGroup
              groupName="options"
              selected={isVertical}
              onChange={(e) => {
                setIsVertical(e.target.value);
              }}
            >
              <Radio value="isVertical">Vertical</Radio>
              <Radio value="isNotVertical">Horizontal</Radio>
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
      <Form id="radio-form">
        <RadioGroup
          groupName="Select Option"
          label={withLabel === "withLabel"}
          inline={isVertical === "isNotVertical"}
          selected={selectedExampleRadio}
          onChange={(e) => setSelectedExampleRadio(e.target.value)}
        >
          <Radio value="Calendar">Calendar</Radio>
          <Radio value="Calculator">Calculator</Radio>
          <Radio value="Notes">Notes</Radio>
        </RadioGroup>
      </Form>
    </Playground>
  );
};
