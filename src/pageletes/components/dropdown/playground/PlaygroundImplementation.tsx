import {
	Avatar,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	Radio,
	RadioGroup,
	SubMenu,
	TextInput,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

type DropdownTypeOption = "default" | "icon" | "input" | "avatar";

export const PlaygroundImplementation = () => {
	const [dropdownType, setDropdownType] =
		useState<DropdownTypeOption>("default");

	const [parentMenuIsOpen, setParentMenuIsOpen] = useState<boolean>(false);

	const [subMenuIsOpen, setSubMenuIsOpen] = useState<boolean>(false);

	const [react, html] = useMemo(() => {
		const isDefault = dropdownType === "default" && !parentMenuIsOpen;

		const reactCode = prettyPrintReact(
			`
<Menu menuRootElement={<Button>Action</Button>} closeOnSelect={false}>
  <MenuItem ${
		dropdownType === "icon" ? "className='neo-icon-error-filled'" : ""
	}>Option 1</MenuItem>
  ${
		dropdownType === "input"
			? '<div className="neo-dropdown--input"><TextInput aria-label="dropdown text input"></TextInput><IconButton aria-label="voice" icon="voice" /></div>'
			: "<MenuItem>Option 2</MenuItem>"
	}
  ${
		dropdownType === "avatar"
			? '<MenuItem><Avatar size="sm"></Avatar>Option 3</MenuItem>'
			: "<MenuItem>Option 3</MenuItem>"
	}
  <SubMenu menuRootElement={<MenuItem>Option 4</MenuItem>}>
      <MenuItem>Sub Option 1</MenuItem>
      <MenuItem>Sub Option 2</MenuItem>
      <MenuItem>Sub Option 3</MenuItem>
    </SubMenu>
</Menu>
`,
		);

		const htmlCode = prettyPrintHtml(
			`
      <div class="neo-dropdown${parentMenuIsOpen ? " neo-dropdown--active" : ""}">
      <button aria-expanded=${parentMenuIsOpen} class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default neo-dropdown__link-header">Action</button>
      <div class="neo-dropdown__content" role="menu">
        <a class="neo-dropdown__link${
					dropdownType === "icon" ? " neo-icon-error-filled" : ""
				}" role="menuitem">Menu Item 1</a>
        ${
					dropdownType === "input"
						? "<div class='neo-dropdown--input'><div class='neo-form-control'><div class='neo-input-editable__wrapper'><input class='neo-input' id='input-no-label' placeholder='Input With No Label' type='text' /></div></div><button class='neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--info neo-icon-voice'></button></div>"
						: "<a class='neo-dropdown__link' role='menuitem'>Menu Item 2</a>"
				}
        ${
					dropdownType === "avatar"
						? "<a class='neo-dropdown__link'><figure class='neo-avatar neo-avatar--small'></figure>Menu Item 3</a>"
						: "<a class='neo-dropdown__link'>Menu Item 3</a>"
				}
        <div class="neo-dropdown__item${
					subMenuIsOpen ? " neo-dropdown--active" : ""
				}" aria-expanded=${parentMenuIsOpen}>
          <a class="neo-dropdown__link" role="menuitem">Option 4</a>
          <div class="neo-dropdown__content" role="menu">
            <a class="neo-dropdown__link" role="menuitem">
            Sub Option 1
            </a>
            <a class="neo-dropdown__link" role="menuitem">
            Sub Option 2
            </a>
            <a class="neo-dropdown__link" role="menuitem">
            Sub Option 3
            </a>
          </div>
        </div>
      </div>
      </div>
`,
		);

		return isDefault ? [defaultReact, defaultHtml] : [reactCode, htmlCode];
	}, [dropdownType, parentMenuIsOpen, subMenuIsOpen]);

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
							<Radio value="default">Default</Radio>
							<Radio value="icon">With Icon</Radio>
							<Radio value="input">With Input</Radio>
							<Radio value="avatar">With Avatar</Radio>
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
			<Menu
				menuRootElement={
					<MenuButton onClick={() => setParentMenuIsOpen(!parentMenuIsOpen)}>
						Action
					</MenuButton>
				}
				closeOnSelect={false}
				onMenuClose={() => {
					setParentMenuIsOpen(false);
					setSubMenuIsOpen(false);
				}}
			>
				<MenuItem
					className={dropdownType === "icon" ? "neo-icon-error-filled" : ""}
				>
					Option 1
				</MenuItem>
				{dropdownType === "input" ? (
					<div className="neo-dropdown--input">
						<TextInput aria-label="dropdown text input" />
						<IconButton aria-label="voice" icon="voice" />
					</div>
				) : (
					<MenuItem>Option 2</MenuItem>
				)}
				{dropdownType === "avatar" ? (
					<MenuItem>
						<Avatar size="sm" />
						Option 3
					</MenuItem>
				) : (
					<MenuItem>Option 3</MenuItem>
				)}
				<SubMenu
					onMouseEnter={() => setSubMenuIsOpen(true)}
					menuRootElement={<MenuItem>Option 4</MenuItem>}
				>
					<MenuItem>Sub Option 1</MenuItem>
					<MenuItem>Sub Option 2</MenuItem>
					<MenuItem>Sub Option 3</MenuItem>
				</SubMenu>
			</Menu>
		</Playground>
	);
};
