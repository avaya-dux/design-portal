import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@avaya/neo-react";

export const TabMenu = (props: { panels: string[] }) => {
  return (
    <Tabs>
      <TabList>
        {props.panels.map((panel: string, i: number) => (
          <Tab id={panel} key={`${i}-${panel}`}>
            {panel.charAt(0).toUpperCase() + panel.slice(1)}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {props.panels.map((panel: string) => (
          <TabPanel>{props[panel as keyof typeof props]}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
