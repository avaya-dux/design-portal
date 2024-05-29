import {
	Icon,
	IconButton,
	List,
	ListItem,
	type ListProps,
	ListSection,
	Radio,
	RadioGroup,
	Select,
	SelectOption,
	Switch,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-list-hvxfzq";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/docs/components-list--docs";

type ListLeftOption = "icon" | "no-icon";

type ListRightOption = "button" | "empty" | "switch";

const iconButton = [
	<IconButton
		key="add-call"
		aria-label="add call"
		icon="call-add"
		shape="circle"
		variant="tertiary"
	/>,
];

const basicSwitch = [
	<Switch key="active" aria-label="Activate" defaultChecked />,
];

const getAction = (option: ListRightOption) => {
	switch (option) {
		case "button":
			return iconButton;
		case "switch":
			return basicSwitch;
		case "empty":
			return [];
		default:
			return <></>;
	}
};

export const PlaygroundImplementation = () => {
	const [listType, setListType] = useState<ListProps["itemType"]>("ListItem");

	const [leftOptions, setLeftOptions] = useState<ListLeftOption>("icon");

	const [rightOptions, setRightOptions] = useState<ListRightOption>("button");

	const [component, react, html] = useMemo(() => {
		const listNames = ["John Smith", "Lucille Ball", "Spinella Manch"];

		const icon =
			leftOptions === "icon" ? <Icon aria-label="star-icon" icon="star" /> : "";

		const actions = getAction(rightOptions);

		const listChildProps = { icon, actions };

		const listChildren = listNames.map((name, index) => {
			const uniqueIndex = index + name + listType;

			return listType === "ListItem" ? (
				<ListItem {...listChildProps} key={uniqueIndex}>
					{name}
				</ListItem>
			) : (
				<ListSection {...listChildProps} key={uniqueIndex}>
					{name}
					<ListSection />
				</ListSection>
			);
		});

		const element = <List itemType={listType}>{listChildren}</List>;

		return [
			element,
			prettyPrintReactElementToString(element),
			prettyPrintReactElementToHtml(element),
		];
	}, [listType, rightOptions, leftOptions]);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Type">
						<Select
							aria-label="List Types"
							onChange={(value: string) => {
								setListType(value as ListProps["itemType"]);
							}}
							value={listType}
						>
							<SelectOption value="ListItem">List Item</SelectOption>
							<SelectOption value="ListSection">List Section</SelectOption>
						</Select>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Left Options">
						<RadioGroup
							groupName="left-options"
							selected={leftOptions}
							onChange={(e: { target: { value: string } }) => {
								setLeftOptions(e.target.value as ListLeftOption);
							}}
						>
							<Radio value="icon">With Icon</Radio>
							<Radio value="no-icon">Without Icon</Radio>
						</RadioGroup>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Right Options">
						<RadioGroup
							groupName="right-options"
							selected={rightOptions}
							onChange={(e: { target: { value: string } }) => {
								setRightOptions(e.target.value as ListRightOption);
							}}
						>
							<Radio value="empty">Empty</Radio>
							<Radio value="switch">Switch</Radio>
							<Radio value="button">Button</Radio>
						</RadioGroup>
					</Playground.OptionsSection>
				</Playground.OptionsContainer>
			}
			examples={{
				react,
				html,
				sandbox,
				storybook,
			}}
		>
			{component}
		</Playground>
	);
};
