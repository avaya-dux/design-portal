import { Form, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

export const PlaygroundImplementation = () => {
  const [withLabel, setWithLabel] = useState<string>("withLabel");

  const [isVertical, setIsVertical] = useState<string>("isVertical");

  const [selectedExampleRadio, setSelectedExampleRadio] = useState<string>("");

  const [react, html] = useMemo(() => {
    const isDefault = withLabel && isVertical;

    const reactCode = prettyPrintReact(
      `
      <Form id="radio-form">
      <RadioGroup
        groupName="Default Radio Group"
        label="Select Option"
        inline=${isVertical === "isNotVertical"}
      >
        <Radio value="Radio 1">Radio 1</Radio>
        <Radio value="Radio 2">Radio 2</Radio>
        <Radio value="Radio 3">Radio 3</Radio>
      </RadioGroup>
    </Form>
`
    );

    const htmlCode = prettyPrintHtml(
      `
      <form class="neo-form">
  <div class="neo-form-control">
    <div class="neo-input-group ${
      isVertical === "isNotVertical" ? "neo-input-group--inline" : ""
    }">
    <label for="Default Radio Group">Select Option</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Radio 1"
        id="radio-1"
        role="radio"
        aria-checked="false"
      />
      <label for="radio-1">Radio 1</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Radio 2"
        id="radio-2"
        role="radio"
        aria-checked="false"
      />
      <label for="radio-2">Radio 2</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Radio 3"
        id="radio-3"
        role="radio"
        aria-checked="false"
      />
      <label for="radio-3">Radio 3</label>
    </div>
  </div>
</form>
`
    );

    return isDefault ? [defaultReact, defaultHtml] : [reactCode, htmlCode];
  }, [isVertical, withLabel]);

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
