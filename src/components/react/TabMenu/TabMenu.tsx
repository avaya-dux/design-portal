import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@avaya/neo-react";

// biome-ignore lint/suspicious/noExplicitAny: no time to fix this
export const TabMenu = (props: any) => {
	return (
		<Tabs>
			<TabList>
				{props.panels.map((panel: string, i: number) => (
					<Tab key={`panel-${i}`} id={panel.toLowerCase()}>
						{panel}
					</Tab>
				))}
			</TabList>
			<TabPanels>
				{props.panels.map((panel: string, i: number) => (
					<TabPanel key={`tabpanel-${i}`}>
						{props[panel.toLowerCase()]}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};
