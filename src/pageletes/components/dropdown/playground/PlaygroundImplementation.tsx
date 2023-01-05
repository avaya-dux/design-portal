import { Avatar, Button, IconButton, Menu, MenuItem, MenuProps, Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

type DropdownTypeOption = "default" | "icon" | "input" | "avatar";

export const PlaygroundImplementation = () => {
  const [dropdownType, setDropdownType] =
    useState<DropdownTypeOption>("default");

  const [isDefault, react, html] = useMemo(() => {
    const isDefaultResult = dropdownType === "default";

    const reactCode = prettyPrintReact(
      `
<Menu menuRootElement={<Button>Open Menu</Button>}>
  <MenuItem ${dropdownType === "icon" ? "className='neo-icon-error-filled'" : ""}>Menu Item 1</MenuItem>
  <MenuItem>Menu Item 2</MenuItem>
  <MenuItem>Menu Item 3</MenuItem>
</Menu>
`
    );

    const htmlCode = prettyPrintHtml(
      `
      <div class="neo-dropdown neo-dropdown--active">
      <button class="neo-btn neo-btn-primary neo-btn-primary--primary neo-dropdown__link-header">Open Menu</button>
      <div class="neo-dropdown__content" role="menu">
        <a class="neo-dropdown__link ${dropdownType === "icon" && "neo-icon-error-filled"}" role="menuitem">Menu Item 1</a>
        <a class="neo-dropdown__link" role="menuitem">Menu Item 2</a>
        <a class="neo-dropdown__link">Menu Item 3</a>
      </div>
    </div>
`
    );

    return [isDefaultResult, reactCode, htmlCode];
  }, [dropdownType]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Dropdown Options">
            <RadioGroup
              groupName="options"
              selected={dropdownType}
              onChange={(e) => {
                setDropdownType(e.target.value as DropdownTypeOption);
              }}
            >
              <Radio value="icon">With Icon</Radio>
              <Radio value="input">With Input</Radio>
              <Radio value="avatar">With Avatar</Radio>
            </RadioGroup>
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
      <Menu className="neo-dropdown--active" menuRootElement={<Button>Open Menu</Button>}>
        <MenuItem className={dropdownType === 'icon' ? "neo-icon-error-filled" : ""}>Menu Item 1</MenuItem>
        {dropdownType === "input" ? (<div className="neo-dropdown--input"><TextInput aria-label="dropdown text input"></TextInput><IconButton aria-label="voice" icon="voice" /></div>) : <MenuItem>Menu Item 2</MenuItem>}
        {dropdownType === "avatar" ? <MenuItem><Avatar size="sm"></Avatar>Menu Item 3</MenuItem> : <MenuItem>Menu Item 3</MenuItem>}
      </Menu>
    </Playground>
  );
};
