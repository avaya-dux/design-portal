import {
  NoContent,
  NoContentProps,
  Select,
  SelectOption,
  TextInput,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "./static";

import "./PlaygroundImplementation.css";

export const PlaygroundImplementation = () => {
  const [icon, setIcon] = useState<NoContentProps["icon"]>("info");
  const [text, setText] = useState<NoContentProps["text"]>("No Content");

  const isDefault = useMemo(
    () => icon === "info" && text === "No Content",
    [icon, text]
  );

  const react = useMemo(
    () => `<NoContent icon={"${icon}"} text={"${text}"} />`,
    [icon, text]
  );

  const html = useMemo(
    () =>
      `<div class="neo-empty-state">
  <p class="neo-icon-${icon}">${text}</p>
</div>`,
    [icon, text]
  );

  return (
    <div className="global-margin global-margin--bottom">
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Icon">
              <Select
                aria-label="Icon"
                value={icon}
                onChange={(value) => setIcon(value as NoContentProps["icon"])}
              >
                {["info", "warning", "error"].map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
              </Select>
            </Playground.OptionsSection>

            <Playground.OptionsSection title="Text">
              <TextInput
                aria-label="Text"
                onChange={(e) => setText(e.target.value)}
              />
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          html: isDefault ? defaultHtml : html,
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        <div className="no-content-playground-wrapper">
          <NoContent icon={icon} text={text} />
        </div>
      </Playground>
    </div>
  );
};
