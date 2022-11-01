import {
  Avatar,
  AvatarChip,
  BasicChip,
  IconChip,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

type ChipPlaygroundOption = "default" | "icon" | "avatar" | "disabled";

export const PlaygroundImplementation = () => {
  const [avatar, setAvatar] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [icon, setIcon] = useState(false);

  const [option, setOption] = useState<ChipPlaygroundOption>("default");

  const displayExample = useMemo(() => {
    let display = (
      <>
        <BasicChip
          disabled={disabled}
          chiptype="basic"
          variant="default"
          text="This"
        />
        <BasicChip
          disabled={disabled}
          chiptype="basic"
          variant="success"
          text="is"
        />
        <BasicChip
          disabled={disabled}
          chiptype="basic"
          variant="info"
          text="a"
        />
        <BasicChip
          disabled={disabled}
          chiptype="basic"
          variant="alert"
          text="placeholder"
        />
        <BasicChip
          disabled={disabled}
          chiptype="basic"
          variant="warning"
          text="example"
        />
      </>
    );

    if (avatar) {
      display = (
        <>
          <AvatarChip
            disabled={disabled}
            chiptype="avatar"
            variant="default"
            text="This"
            smallAvatar={<Avatar label="Jimmy Bob" size="sm" />}
          />
          <AvatarChip
            disabled={disabled}
            chiptype="avatar"
            variant="success"
            text="is"
            smallAvatar={<Avatar label="Jimmy Bob" size="sm" />}
          />
          <AvatarChip
            disabled={disabled}
            chiptype="avatar"
            variant="info"
            text="a"
            smallAvatar={<Avatar label="Jimmy Bob" size="sm" />}
          />
          <AvatarChip
            disabled={disabled}
            chiptype="avatar"
            variant="alert"
            text="placeholder"
            smallAvatar={<Avatar label="Jimmy Bob" size="sm" />}
          />
          <AvatarChip
            disabled={disabled}
            chiptype="avatar"
            variant="warning"
            text="example"
            smallAvatar={<Avatar label="Jimmy Bob" size="sm" />}
          />
        </>
      );
    } else if (icon) {
      display = (
        <>
          <IconChip
            disabled={disabled}
            chiptype="icon"
            variant="default"
            text="This"
            icon="info"
          />
          <IconChip
            disabled={disabled}
            chiptype="icon"
            variant="success"
            text="is"
            icon="info"
          />
          <IconChip
            disabled={disabled}
            chiptype="icon"
            variant="info"
            text="a"
            icon="info"
          />
          <IconChip
            disabled={disabled}
            chiptype="icon"
            variant="alert"
            text="placeholder"
            icon="info"
          />
          <IconChip
            disabled={disabled}
            chiptype="icon"
            variant="warning"
            text="example"
            icon="info"
          />
        </>
      );
    }

    return display;
  }, [avatar, disabled, icon]);

  const react = useMemo(() => {
    return prettyPrintReact(`
<BasicChip chiptype="basic" variant="default" text="This" />
<BasicChip chiptype="basic" variant="success" text="is" />
<BasicChip chiptype="basic" variant="info" text="a" />
<BasicChip chiptype="basic" variant="alert" text="placeholder" />
<BasicChip chiptype="basic" variant="warning" text="example" />
    `);
  }, [avatar, disabled, icon]);
  const html = useMemo(() => {
    return prettyPrintHtml(`
<div className="neo-chip neo-chip--default">This</div>
<div className="neo-chip neo-chip--success">is</div>
<div className="neo-chip neo-chip--info">a</div>
<div className="neo-chip neo-chip--alert">placeholder</div>
<div className="neo-chip neo-chip--warning">example</div>
    `);
  }, [avatar, disabled, icon]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Chip Options">
            <RadioGroup
              groupName="options"
              selected={option}
              onChange={(e) => {
                setOption(e.target.value as ChipPlaygroundOption);
                switch (e.target.value) {
                  case "avatar":
                    setAvatar(true);
                    setDisabled(false);
                    setIcon(false);
                    break;

                  case "disabled":
                    setAvatar(false);
                    setDisabled(true);
                    setIcon(false);
                    break;

                  case "icon":
                    setAvatar(false);
                    setDisabled(false);
                    setIcon(true);
                    break;

                  default:
                    setAvatar(false);
                    setDisabled(false);
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
        </Playground.OptionsContainer>
      }
      examples={{
        html: option === "default" ? defaultHtml : html,
        react: option === "default" ? defaultReact : react,
        sandbox,
        storybook,
      }}
    >
      {displayExample}
    </Playground>
  );
};
