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

type ChipPlaygroundOption = "default" | "icon" | "avatar" | "disabled";

export const PlaygroundImplementation = () => {
  const [avatar, setAvatar] = useState(false);
  const [closable, setClosable] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [disabled, setDisabled] = useState(false);
  const [icon, setIcon] = useState(false);

  const [option, setOption] = useState<ChipPlaygroundOption>("default");

  const react = useMemo(() => {
    return prettyPrintReact(``);
  }, [avatar, disabled, icon]);
  const html = useMemo(() => {
    return prettyPrintHtml(``);
  }, [avatar, disabled, icon]);

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
                    setAvatar(true);
                    setIcon(false);
                    break;

                  case "icon":
                    setAvatar(false);
                    setIcon(true);
                    break;

                  default:
                    setAvatar(false);
                    setIcon(false);
                    break;
                }
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="avatar">Avatar</Radio>
              <Radio value="disabled">Disabled</Radio>
              <Radio value="icon">Icon</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection
            title="Variables"
            style={{ gridGap: "0.7rem" }}
          >
            <CheckboxGroup
              groupName="Variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "closable":
                    setClosable(!closable);
                    break;
                  case "dir":
                    setDir(dir === "ltr" ? "rtl" : "ltr");
                    break;
                  case "disabled":
                    setDisabled(!disabled);
                    break;
                }
              }}
            >
              <Checkbox
                label="Closable"
                value="closable"
                checked={!!closable}
              />
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
          disabled={disabled}
          avatarInitials={avatar ? "EX" : ""}
          icon={icon ? "info" : undefined}
        >
          This
        </Chip>
        <Chip
          variant="success"
          closable={closable}
          disabled={disabled}
          avatarInitials={avatar ? "EX" : ""}
          icon={icon ? "info" : undefined}
        >
          is
        </Chip>
        <Chip
          variant="info"
          closable={closable}
          disabled={disabled}
          avatarInitials={avatar ? "EX" : ""}
          icon={icon ? "info" : undefined}
        >
          a
        </Chip>
        <Chip
          variant="alert"
          closable={closable}
          disabled={disabled}
          avatarInitials={avatar ? "EX" : ""}
          icon={icon ? "info" : undefined}
        >
          placeholder
        </Chip>
        <Chip
          variant="warning"
          closable={closable}
          disabled={disabled}
          avatarInitials={avatar ? "EX" : ""}
          icon={icon ? "info" : undefined}
        >
          example
        </Chip>
      </ChipsContainer>
    </Playground>
  );
};
