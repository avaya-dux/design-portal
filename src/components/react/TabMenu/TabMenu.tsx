import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@avaya/neo-react";

export const TabMenu = (props) => {
    return (
        <Tabs>
            <TabList>
                {props.panels.map((panel: string) => (
                    <Tab id={panel}>{panel.charAt(0).toUpperCase() + panel.slice(1)}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {props.panels.map((panel: string) => (
                    <TabPanel>{props[panel]}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};