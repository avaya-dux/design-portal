/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Link,
} from "@avaya/neo-react";
import { useCallback, useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { createReactCode, createHtmlCode } from "./utils";

type TypeOption = "standalone" | "inline";

type IconPlacement = "none" | "left" | "right";

import "./PlaygroundImplementation.css";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-link--default";
const sandbox = "https://codesandbox.io/s/neo-react-link-pr4mw7";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("standalone");
  const [iconPlacement, setIconPlacement] = useState<IconPlacement>("none");
  const [disabled, setDisabled] = useState(false);

  const [iconDisabled, setIconDisabled] = useState(false);

  const [react, html] = useMemo(() => {
    const reactCode = prettyPrintReact(
      createReactCode(typeOption, disabled, iconPlacement)
    );

    const htmlCode = prettyPrintHtml(
      createHtmlCode(typeOption, disabled, iconPlacement)
    );

    return [reactCode, htmlCode];
  }, [typeOption, iconPlacement, disabled]);

  const renderLink = useCallback(() => {
    if (typeOption === "inline") {
      return (
        <Link href="#main" inline disabled={disabled}>
          Link
        </Link>
      );
    } else {
      if (iconPlacement === "none") {
        return (
          <Link href="#main" disabled={disabled}>
            Link
          </Link>
        );
      } else {
        return (
          <Link
            href="#main"
            disabled={disabled}
            placement={iconPlacement === "right" ? "right" : "left"}
            icon="print"
          >
            Link
          </Link>
        );
      }
    }
  }, [iconPlacement, disabled, typeOption]);

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

                if (e.target.value === "standalone") {
                  setIconDisabled(false);
                } else {
                  setIconDisabled(true);
                }
              }}
            >
              <Radio value="standalone">Standalone</Radio>
              <Radio value="inline">Inline</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variants" id="icon-placement">
            <RadioGroup
              groupName="icon-placement"
              selected={iconPlacement}
              disabled={iconDisabled}
              onChange={(e) => {
                setIconPlacement(e.target.value as IconPlacement);
              }}
            >
              <Radio value="none">No Icon</Radio>
              <Radio value="left">Icon on Left</Radio>
              <Radio value="right">Icon on Right</Radio>
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
      {renderLink()}
    </Playground>
  );
};
