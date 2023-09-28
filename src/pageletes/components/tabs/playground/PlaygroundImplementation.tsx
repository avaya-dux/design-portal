import {
  Checkbox,
  CheckboxGroup,
  Tabs,
  TabList,
  Select,
  SelectOption,
  Tab,
  TabPanel,
  TabPanels,
  type TabProps,
  type TabPanelProps,
} from "@avaya/neo-react";

import { useCallback, useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  // prettyPrintReactElementToHtml, // TODO: fix
  prettyPrintReactElementToString,
} from "helpers/utils";

export const sandbox = "https://codesandbox.io/s/neo-react-tabs-s44lnl";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tab--uncontrolled-active-tab-story";

type Orientation = "horizontal" | "vertical";
const icons = ["info", "settings", "check", "chat"];
export const PlaygroundImplementation = () => {
  const [withIcon, setWithIcon] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const createTab = useCallback(
    (id: string) => {
      const props: TabProps = {
        id: `tab${id}`,
        children: `Tab item ${id}`,
      };
      if (withIcon) {
        props.icon = icons[parseInt(id)];
      }
      if (id === "3") {
        props.disabled = true;
      }
      return <Tab {...props}></Tab>;
    },
    [withIcon],
  );

  const createTabPanel = useCallback(
    (id: string) => {
      const props = {} as TabPanelProps;
      if (orientation === "horizontal") {
        props.children = <p style={{ marginTop: "1rem" }}>content {id}</p>;
      } else {
        props.children = <p style={{ marginLeft: "1rem" }}>content {id}</p>;
      }
      return <TabPanel key={id} {...props}></TabPanel>;
    },
    [orientation],
  );

  const [component, react, html] = useMemo(() => {
    const panels = [1, 2, 3].map((i) => createTabPanel(i.toString()));
    const element = (
      <Tabs defaultIndex={0} orientation={orientation}>
        <TabList>{[1, 2, 3].map((i) => createTab(i.toString()))}</TabList>
        <TabPanels>{panels}</TabPanels>
      </Tabs>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      // TODO: fix
      // prettyPrintReactElementToHtml(element),
      "In progress",
    ];
  }, [orientation, createTab, createTabPanel]);
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
