import { useState, useMemo } from "react";
import { Playground } from "components/react";
import {
  Button,
  Checkbox,
  Form,
  Radio,
  RadioGroup,
  TextInput,
} from "@avaya/neo-react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-form";

const sandbox =
  "https://codesandbox.io/s/neo-react-breadcrumbs-tqvmzp?file=/src/App.js";

type InlineType = "inline" | "normal";


export const PlaygroundImplementation = () => {
  const [formStyle, setFormStyle] = useState<InlineType>("normal");
  const [element, react, html] = useMemo(() => {

    const element = (
      <div style={{ maxWidth: "50%" }}>
        <Form
          aria-label="Playground form"
          inline={formStyle === "inline" ? true : false}
        >
          <TextInput
            label="Name"
            clearable
            helperText="Type your full name here."
          />

          <TextInput
            label="Email"
            clearable
            type="email"
            helperText="Type your email here."
          />
          <Checkbox aria-label="Newsletter checkbox" value={1}>
            Yes, sign me up for Newsletter.
          </Checkbox>
          <Button variant="primary" id="btnSubmit">
            Submit
          </Button>
          <Button variant="secondary" id="btnCancel">
            Cancel
          </Button>
        </Form>
      </div>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
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
