/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Link,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";

import { reactCode, htmlCode } from "./utils";

import "./PlaygroundImplementation.css";

type TypeOption = "standalone" | "inline";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-link";
const sandbox = "https://codesandbox.io/s/neo-react-link-pr4mw7";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("standalone");
  const [disabled, setDisabled] = useState(false);

  const [element, react, html] = useMemo(() => {
    const element = (
      typeOption === "inline"
      ?
        <Link href="#main" inline disabled={disabled}>Link</Link>
      :
        <Link href="#main" disabled={disabled}>Link</Link>
    );
    return [element, reactCode(typeOption, disabled), htmlCode(typeOption, disabled)];
  }, [typeOption, disabled]);

  return (
    <div id="component-link-playground">
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
                <Radio value="standalone">Standalone</Radio>
                <Radio value="inline">Inline</Radio>
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
        <div>{element}</div>
      </Playground>
    </div>
  );
};
