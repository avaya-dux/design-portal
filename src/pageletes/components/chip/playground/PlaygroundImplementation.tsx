import {
  Checkbox,
  CheckboxGroup,
  Chip,
  ChipsContainer,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

import "./PlaygroundImplementation.css";

type ChipPlaygroundOption = "default" | "icon" | "avatar";

export const PlaygroundImplementation = () => {
  const [chipType, setChipType] = useState<"default" | "avatar" | "icon">(
    "default"
  );
  const [closable, setClosable] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [disabled, setDisabled] = useState(false);

  const [option, setOption] = useState<ChipPlaygroundOption>("default");

  const react = useMemo(() => {
    return prettyPrintReact(``);
  }, [chipType, closable, dir, disabled]);
  const html = useMemo(() => {
    return prettyPrintHtml(``);
  }, [chipType, closable, dir, disabled]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Chip Types">
            <RadioGroup
              groupName="options"
              selected={option}
              onChange={(e) => {
                setOption(e.target.value as ChipPlaygroundOption);
                switch (e.target.value) {
                  case "avatar":
                    setChipType("avatar");
                    break;

                  case "icon":
                    setChipType("icon");
                    break;

                  default:
                    setChipType("default");
                    break;
                }
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="avatar">Avatar</Radio>
              <Radio value="icon">Icon</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection
            title="Variables"
            htmlFor="Variables"
            className="hack-hide-me"
          >
            <CheckboxGroup
              groupName="Variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "closable":
                    setClosable(!closable);
                    setDisabled(false);
                    break;
                  case "dir":
                    setDir(dir === "ltr" ? "rtl" : "ltr");
                    break;
                  case "disabled":
                    setClosable(false);
                    setDisabled(!disabled);
                    break;
                }
              }}
            >
              <Checkbox label="Closable" value="closable" checked={closable} />
              <Checkbox label="RTL" value="dir" checked={dir === "rtl"} />
              <Checkbox label="Disabled" value="disabled" checked={disabled} />
            </CheckboxGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: option === "default" ? defaultHtml : html,
        react: option === "default" ? defaultReact : react,
        sandbox,
        storybook,
      }}
    >
      <ChipsContainer>
        <Chip
          variant="default"
          closable={closable}
          dir={dir}
          disabled={disabled}
          avatarInitials={chipType === "avatar" ? "EX" : ""}
          icon={chipType === "icon" ? "info" : undefined}
        >
          This
        </Chip>
        <Chip
          variant="success"
          closable={closable}
          dir={dir}
          disabled={disabled}
          avatarInitials={chipType === "avatar" ? "EX" : ""}
          icon={chipType === "icon" ? "info" : undefined}
        >
          is
        </Chip>
        <Chip
          variant="info"
          closable={closable}
          dir={dir}
          disabled={disabled}
          avatarInitials={chipType === "avatar" ? "EX" : ""}
          icon={chipType === "icon" ? "info" : undefined}
        >
          a
        </Chip>
        <Chip
          variant="alert"
          closable={closable}
          dir={dir}
          disabled={disabled}
          avatarInitials={chipType === "avatar" ? "EX" : ""}
          icon={chipType === "icon" ? "info" : undefined}
        >
          placeholder
        </Chip>
        <Chip
          variant="warning"
          closable={closable}
          dir={dir}
          disabled={disabled}
          avatarInitials={chipType === "avatar" ? "EX" : ""}
          icon={chipType === "icon" ? "info" : undefined}
        >
          example
        </Chip>
      </ChipsContainer>
    </Playground>
  );
};
