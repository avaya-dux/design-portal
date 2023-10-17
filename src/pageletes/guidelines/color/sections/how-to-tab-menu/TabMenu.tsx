
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@avaya/neo-react";

export const TabMenu = () => {

    return (
        <div>
            <slot name="tab1" slot="tab1"/>
            <Tabs>
                <TabList>
                    <Tab id="tab1">Base</Tab>
                    <Tab id="tab2">Red</Tab>
                    <Tab id="tab3">Blue</Tab>
                    <Tab id="tab4">Green</Tab>
                    <Tab id="tab5">Orange</Tab>
                    <Tab id="tab6">Purple</Tab>
                </TabList>
                <TabPanels> 
                    <slot name="tab1" slot="tab1"/>
                    <TabPanel><slot name="tab1"/></TabPanel>
                    <TabPanel><slot name="tab2"/></TabPanel>
                    <TabPanel><slot name="tab3"/></TabPanel>
                    <TabPanel><slot name="tab4"/></TabPanel>
                    <TabPanel><slot name="tab5"/></TabPanel>
                    <TabPanel><slot name="tab6"/></TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}