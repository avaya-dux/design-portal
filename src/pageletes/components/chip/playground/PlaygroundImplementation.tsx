import {
  Checkbox,
  CheckboxGroup,
  Chip,
  ChipsContainer,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

import "./PlaygroundImplementation.css";

type ChipTypeOption = "default" | "icon" | "avatar";

export const PlaygroundImplementation = () => {
  const [chipType, setChipType] = useState<ChipTypeOption>("default");
  const [closable, setClosable] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [disabled, setDisabled] = useState(false);

  const [isDefault, react, html] = useMemo(() => {
    const isDefaultResult =
      chipType === "default" && dir === "ltr" && !closable && !disabled;

    const reactCodeProps = clsx(
      chipType === "avatar" && 'avatarInitials="EX"',
      chipType === "icon" && 'icon="info"',
      disabled && "disabled",
      closable && "closable",
      dir === "rtl" && 'dir="rt"'
    );
    const reactCode = prettyPrintReact(
      `
<ChipsContainer>
<Chip variant="default" ${reactCodeProps}>This</Chip>
<Chip variant="success" ${reactCodeProps}>is</Chip>
<Chip variant="info" ${reactCodeProps}>a</Chip>
<Chip variant="alert" ${reactCodeProps}>placeholder</Chip>
<Chip variant="warning" ${reactCodeProps}>example</Chip>
</ChipsContainer>
`
    );

    // TODO: Add HTML code
    const htmlCode = prettyPrintHtml(
      `
<div class="neo-chips">
<div class="neo-chip neo-chip--default neo-chips__item">This</div>
<div class="neo-chip neo-chip--success neo-chips__item">is</div>
<div class="neo-chip neo-chip--info neo-chips__item">a</div>
<div class="neo-chip neo-chip--alert neo-chips__item">placeholder</div>
<div class="neo-chip neo-chip--warning neo-chips__item">example</div>
</div>
`
    );
    return [isDefaultResult, reactCode, htmlCode];
  }, [chipType, closable, dir, disabled]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Chip Types">
            <RadioGroup
              groupName="options"
              selected={chipType}
              onChange={(e) => {
                setChipType(e.target.value as ChipTypeOption);
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
        html: isDefault ? defaultHtml : html,
        react: isDefault ? defaultReact : react,
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
