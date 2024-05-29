import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@avaya/neo-react";

export const TabMenu = (props) => {
	return (
		<Tabs>
			<TabList>
				{props.panels.map((panel: string) => (
					<Tab id={panel.toLowerCase()}>{panel}</Tab>
				))}
			</TabList>
			<TabPanels>
				{props.panels.map((panel: string) => (
					<TabPanel>{props[panel.toLowerCase()]}</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};
