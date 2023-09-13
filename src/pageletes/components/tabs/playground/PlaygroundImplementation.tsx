import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  Select,
  SelectOption,
  Tab,
  TabPanel,
  TabPanels,
  type TabProps,
} from "@avaya/neo-react";

import { useCallback, useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers/utils";

export const sandbox = "https://codesandbox.io/s/neo-react-tabs-s44lnl";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tab--uncontrolled-active-tab-story";

type StateType = "default" | "disabled";
type Orientation = "horizontal" | "vertical";
export const PlaygroundImplementation = () => {
  const [withIcon, setWithIcon] = useState(false);
  const [state, setState] = useState<StateType>("default");
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const createTab = useCallback(
    (id: string) => {
      const props: TabProps = {
        id: `tab${id}`,
        disabled: state === "disabled",
        children: `Tab${id}`,
      };
      if (withIcon) {
        props.icon = "check";
      }
      return <Tab {...props}></Tab>;
    },
    [withIcon, state],
  );

  const [component, react, html] = useMemo(() => {
    const element = (
      <Tabs defaultIndex={0} initialFocus={true} orientation={orientation}>
        <TabList>{[1, 2, 3].map((i) => createTab(i.toString()))}</TabList>

        <TabPanels>
          <TabPanel>content 1</TabPanel>
          <TabPanel>content 2</TabPanel>
          <TabPanel>content 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [orientation, createTab]);
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
          <Playground.OptionsSection title="State">
            <RadioGroup
              groupName="state"
              selected={state}
              onChange={(e) => {
                setState(e.target.value as StateType);
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="disabled">Disabled</Radio>
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
      {component}
    </Playground>
  );
};
