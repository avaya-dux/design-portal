import { useState, useMemo } from "react";
import { Playground } from "components/react";
import { Button, Form, Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import {
  // prettyPrintReactElementToHtml, // TODO: fix
  prettyPrintReactElementToString,
} from "helpers";

import "./PlaygroundImplementation.css";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-form-base--docs";

const sandbox =
  "https://codesandbox.io/s/neo-react-form-9z3j4q?file=/src/App.js";

type InlineType = "inline" | "normal";

export const PlaygroundImplementation = () => {
  const [formStyle, setFormStyle] = useState<InlineType>("normal");
  const [element, react, html] = useMemo(() => {
    const element = (
      <Form
        aria-label="Playground form"
        inline={formStyle === "inline" ? true : false}
      >
        <TextInput
          label="Name"
          clearable
          type="text"
          placeholder="Type your name here."
        />
        <TextInput
          label="Email"
          clearable
          type="email"
          placeholder="Type your email here."
        />
        <Button
          variant="primary"
          id={formStyle === "inline" ? "btn-submit-inline" : "btn-submit"}
        >
          Submit
        </Button>
        <Button variant="secondary" id="btnCancel">
          Cancel
        </Button>
      </Form>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      // TODO: fix
      // prettyPrintReactElementToHtml(element),
      "In progress",
    ];
  }, [formStyle]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Form Style">
            <RadioGroup
              groupName="form-options"
              selected={formStyle}
              onChange={(e) => {
                setFormStyle(e.target.value as InlineType);
              }}
            >
              <Radio value="inline">Inline</Radio>
              <Radio value="normal">Normal</Radio>
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
      {element}
    </Playground>
  );
};
