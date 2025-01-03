import {
	Checkbox,
	CheckboxGroup,
	Select,
	SelectOption,
	Tab,
	TabList,
	TabPanel,
	type TabPanelProps,
	TabPanels,
	Tabs,
} from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers/utils";

export const sandbox = "https://codesandbox.io/s/neo-react-tabs-s44lnl";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/components-tab--uncontrolled-active-tab-story";

type Orientation = "horizontal" | "vertical";
const icons = ["info", "settings", "check", "chat"];

export const PlaygroundImplementation = () => {
	const [orientation, setOrientation] = useState<Orientation>("horizontal");
	const [withIcon, setWithIcon] = useState<boolean>(false);

	const [component, react, html] = useMemo(() => {
		const createTab = (id: string) => (
			<Tab
				key={id}
				id={id}
				icon={withIcon ? icons[Number.parseInt(id)] : undefined}
			>
				Tab item ${id}
			</Tab>
		);

		const createTabPanel = (id: string) => {
			const props = {} as TabPanelProps;
			if (orientation === "horizontal") {
				props.children = <p style={{ marginTop: "1rem" }}>content {id}</p>;
			} else {
				props.children = <p style={{ marginLeft: "1rem" }}>content {id}</p>;
			}
			return <TabPanel key={id} {...props} />;
		};

		const panels = [1, 2].map((i) => createTabPanel(i.toString()));
		const element = (
			<Tabs defaultIndex={0} orientation={orientation}>
				<TabList>{[1, 2].map((i) => createTab(i.toString()))}</TabList>

				<TabPanels>{panels}</TabPanels>
			</Tabs>
		);

		return [
			element,
			prettyPrintReactElementToString(element),
			prettyPrintReactElementToHtml(element),
		];
	}, [orientation, withIcon]);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Type">
						<Select
							aria-label="Tabs Orientation"
							onChange={(value) => setOrientation(value as Orientation)}
							defaultValue="horizontal"
						>
							<SelectOption value="horizontal">Horizontal</SelectOption>
							<SelectOption value="vertical">Vertical</SelectOption>
						</Select>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Variable">
						<CheckboxGroup
							groupName="Variable"
							aria-labelledby="variable"
							onChange={(e) => {
								const { value } = e.target as HTMLInputElement;
								switch (value) {
									case "selected":
										setWithIcon(!withIcon);
										break;
								}
							}}
						>
							<Checkbox value="selected" checked={withIcon}>
								With Icon
							</Checkbox>
						</CheckboxGroup>
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
			{component}
		</Playground>
	);
};
