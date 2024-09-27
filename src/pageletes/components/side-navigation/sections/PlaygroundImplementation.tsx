import { Radio, RadioGroup, SideNavigation } from "@avaya/neo-react";
import { Playground } from "components/react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";
import { useMemo, useState } from "react";

const sandbox =
	"https://codesandbox.io/s/neo-react-sidenav-forked-5yml3c?file=/src/App.js";
const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/docs/components-left-navigation--docs";

export const PlaygroundImplementation = () => {
	type IconOption = "icon" | "none";
	const [iconType, setIconType] = useState<IconOption>("icon");

	const [element, react, html] = useMemo(() => {
		const expandedStates = [true, false];

		const accountLinkItems = [
			<SideNavigation.LinkItem key="account-link-item-1" href="#/1">
				Account
			</SideNavigation.LinkItem>,
			<SideNavigation.LinkItem key="account-link-item-2" href="#/2">
				Business Rules
			</SideNavigation.LinkItem>,
			<SideNavigation.LinkItem key="account-link-item-3" href="#/3">
				Contact Centers
			</SideNavigation.LinkItem>,
		];

		const analyticsLinkItems = [
			<SideNavigation.LinkItem key="analytics-link-item-1" href="#/4">
				Dashboard
			</SideNavigation.LinkItem>,
			<SideNavigation.LinkItem key="analytics-link-item-2" href="#/5">
				Usage Report
			</SideNavigation.LinkItem>,
		];

		const categoryNames = ["Accounts", "Analytics"];
		const categoryIcons = ["contact", "analytics"];

		const getLinkItems = (category: string) => {
			switch (category) {
				case "Accounts":
					return accountLinkItems;
				case "Analytics":
					return analyticsLinkItems;
				default:
					return null;
			}
		};

		const listCategories = categoryNames.map((category, index) => {
			return iconType === "icon" ? (
				<SideNavigation.NavCategory
					expanded={expandedStates[index]}
					icon={categoryIcons[index]}
					label={category}
					key={`icon-category-${index}`}
				>
					{getLinkItems(category)}
				</SideNavigation.NavCategory>
			) : (
				<SideNavigation.NavCategory
					expanded={expandedStates[index]}
					label={category}
					key={`nonicon-category-${index}`}
				>
					{getLinkItems(category)}
				</SideNavigation.NavCategory>
			);
		});

		const settingsTopLinkItem =
			iconType === "icon" ? (
				<SideNavigation.TopLinkItem
					key="settings-top-link-item-1"
					icon="settings"
					label="Settings"
					href="#settings"
				/>
			) : (
				<SideNavigation.TopLinkItem
					key="settings-top-link-item-2"
					label="Settings"
					href="#settings"
				/>
			);

		const element = (
			<SideNavigation aria-label="Main Navigation" currentUrl="#/1">
				{listCategories}
				{settingsTopLinkItem}
			</SideNavigation>
		);

		return [
			element,
			prettyPrintReactElementToString(element),
			prettyPrintReactElementToHtml(element),
		];
	}, [iconType]);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Icon Options">
						<RadioGroup
							groupName="options"
							selected={iconType}
							onChange={(e) => {
								setIconType(e.target.value as IconOption);
							}}
						>
							<Radio value="icon">With Icon</Radio>
							<Radio value="none">Text Only</Radio>
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
			<div style={{ minWidth: "15rem" }}>{element}</div>
		</Playground>
	);
};
