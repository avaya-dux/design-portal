import type { StepperProps, Steps } from "@avaya/neo-react";
import {
  Stepper,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
  Switch,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import "./PlaygroundImplementation.css";

export const sandbox =
  "https://codesandbox.io/p/sandbox/neo-react-stepper-wny8j6?file=%2Fsrc%2FApp.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-stepper--docs";

type TypeOption = "horizontal" | "vertical";

const steps: Steps[] = [
  { title: "Step 1", description: "This is step 1" },
  { title: "Step 2", description: "This is step 2" },
  { title: "Step 3", description: "This is step 3" },
];

export const PlaygroundImplementation = () => {
  const [orientation, setOrientation] = useState<TypeOption>("horizontal");
  const [type, setType] = useState<StepperProps["type"]>("editable");
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);

  const [element, react, html] = useMemo(() => {
    const filteredSteps = steps.map((step) => {
      const newStep = { ...step };
      if (!showTitle) {
        delete newStep.title;
      }
      if (!showDescription) {
        delete newStep.description;
      }
      return newStep;
    });

    const element = (
      <Stepper
        steps={filteredSteps}
        activeStep={1}
        direction={orientation}
        type={type}
      />
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [orientation, showDescription, showTitle, type]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Orientation">
            <Select
              aria-label="Orientation"
              value={orientation}
              onChange={(value) => setOrientation(value as TypeOption)}
            >
              <SelectOption value="horizontal">Horizontal</SelectOption>
              <SelectOption value="vertical">Vertical</SelectOption>
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type"
              selected={type}
              onChange={(e: { target: { value: string } }) => {
                setType(e.target.value as StepperProps["type"]);
              }}
            >
              <Radio value="editable">Editable</Radio>
              <Radio value="linear">Non-editable</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Title">
            <Switch
              checked={showTitle}
              onChange={() => {
                setShowTitle(!showTitle);

                // if showTitle is being turned off, turn off showDescription
                if (showTitle === true) {
                  setShowDescription(false);
                }
              }}
              aria-label="Show title"
            />
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Description">
            <Switch
              checked={showDescription}
              onChange={() => {
                setShowDescription(!showDescription);

                // if showDescription is being turned on, turn on showTitle
                if (showDescription === false) {
                  setShowTitle(true);
                }
              }}
              aria-label="Show description"
            />
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
      <div
        className={
          orientation === "horizontal"
            ? "stepper-playground-wrapper-horizontal"
            : "stepper-playground-wrapper-vertical"
        }
      >
        {element}
      </div>
    </Playground>
  );
};
