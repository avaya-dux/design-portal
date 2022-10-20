import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "./static";

export const PlaygroundImplementation = () => {
  const [animation, setAnimation] = useState<ButtonProps["animation"]>("none");
  const [badge, setBadge] = useState<"1234" | undefined>(undefined);
  const [dir, setDir] = useState<ButtonProps["dir"]>("ltr");
  const [disabled, setDisabled] = useState<ButtonProps["disabled"]>(false);
  const [icon, setIcon] = useState<"audio" | undefined>(undefined);
  const [size, setSize] = useState<ButtonProps["size"]>("default");
  const [variant, setVariant] = useState<ButtonProps["variant"]>("primary");

  const isDefault = useMemo(
    () =>
      animation === "none" &&
      badge === undefined &&
      dir === "ltr" &&
      disabled === false &&
      !icon &&
      size === "default" &&
      variant === "primary",
    [animation, badge, dir, disabled, icon, size, variant]
  );

  const react = useMemo(
    () =>
      `<Button
  animation="${animation}"
  badge="${badge}"
  dir="${dir}"
  disabled={${disabled}}
  icon="${icon}"
  size="${size}"
  variant="${variant}"
>
  ${isDefault ? "default" : "custom"}
</Button>`,
    [animation, badge, dir, disabled, icon, size, variant]
  );
  const html = useMemo(
    () =>
      `<button
  class="${clsx(
    "neo-btn",
    `neo-btn-${variant} neo-btn-${variant}--${size}`,
    animation === "pulse" && "neo-pulse",
    badge && "neo-badge"
  )}"
  disabled={${disabled}}
  dir="${dir}"
  data-badge="${badge}"
>
  ${animation === "spinner" ? `<div class="neo-spinner"></div> ` : ""}${
        isDefault ? "default" : "custom"
      }
</button>`,
    [animation, badge, dir, disabled, icon, size, variant]
  );

  return (
    <div className="global-margin global-margin--bottom">
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Type">
              <Select
                aria-label="Button Type Variant"
                value={variant || "primary"}
                onChange={(value) =>
                  setVariant(value as ButtonProps["variant"])
                }
              >
                <SelectOption value="primary">Primary</SelectOption>
                <SelectOption value="secondary">Secondary</SelectOption>
                <SelectOption value="tertiary">Tertiary</SelectOption>
              </Select>
            </Playground.OptionsSection>

            <Playground.OptionsSection
              title="Size"
              style={{ gridGap: "0.3rem" }}
            >
              <RadioGroup
                groupName="Size"
                selected={size as string}
                onChange={(e) => setSize(e.target.value as ButtonProps["size"])}
              >
                <Radio value="compact">Compact</Radio>
                <Radio value="default">Default</Radio>
                <Radio value="wide">Wide</Radio>
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
                    case "disabled":
                      setDisabled(!disabled);
                      break;
                    case "icon":
                      setIcon(icon ? undefined : "audio");
                      break;
                    case "badge":
                      setBadge(badge ? undefined : "1234");
                      break;
                    case "dir":
                      setDir(dir === "ltr" ? "rtl" : "ltr");
                      break;
                  }
                }}
              >
                <Checkbox label="RTL" value="dir" checked={dir === "rtl"} />
                <Checkbox
                  label="Disabled"
                  value="disabled"
                  checked={disabled}
                />
                <Checkbox label="Icon" value="icon" checked={!!icon} />
                <Checkbox label="Badge" value="badge" checked={!!badge} />
              </CheckboxGroup>
            </Playground.OptionsSection>

            <Playground.OptionsSection
              title="Animation"
              style={{ gridGap: "0.3rem" }}
            >
              <RadioGroup
                groupName="Animation"
                selected={animation || "none"}
                onChange={(e) =>
                  setAnimation(e.target.value as ButtonProps["animation"])
                }
              >
                <Radio value="none">None</Radio>
                <Radio value="pulse">Pulse</Radio>
                <Radio value="spinner">Spinner</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          className: "height-220",
          html: isDefault ? defaultHtml : html,
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        <Button
          animation={animation || "none"}
          badge={badge || ""}
          dir={dir}
          disabled={disabled}
          icon={icon}
          size={size || "default"}
          variant={variant || "primary"}
        >
          {isDefault ? "default" : "custom"}
        </Button>
      </Playground>
    </div>
  );
};
