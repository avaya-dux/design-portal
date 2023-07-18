import { Icon, IconButton, List, ListItem, ListSection, Radio, RadioGroup, Select, SelectOption } from "@avaya/neo-react";
import { useEffect, useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintReactElementToHtml, prettyPrintReactElementToString } from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips";

type ListTypeOption = "item" | "section";

type ListLeftOption = "icon" | "no-icon";

type ListRightOption = "button" | "no-button";

export const PlaygroundImplementation = () => {
  const [listType, setListType] = useState<ListTypeOption>("item");

  const [leftOptions, setLeftOptions] = useState<ListLeftOption>("icon");

  const [rightOptions, setRightOptions] = useState<ListRightOption>("button");

  const [component, react, html] = useMemo(() => {
    const element = (
      <List itemType="ListItem">
        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>

        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>
      </List>
    );

    return [
      element,
      "one",
      "two"
      // prettyPrintReactElementToString(element),
      // prettyPrintReactElementToHtml(element),
    ];
  }, [])

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <Select
              aria-label="List Types"
              onChange={(value) => setListType(value as ListTypeOption)}
              defaultValue="item"
            >
              <SelectOption value="item">List Item Group</SelectOption>
              <SelectOption value="section">List Section Group</SelectOption>
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Left Options">
            <RadioGroup
              groupName="left options"
              selected={leftOptions}
              onChange={(e) => {
                console.log(e.target.value);
                setLeftOptions(e.target.value);
              }}
            >
              <Radio value="icon">With Icon</Radio>
              <Radio value="no-icon">Without Icon</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Right Options">
            <RadioGroup
              groupName="right options"
              selected={rightOptions}
              onChange={(e) => {
                setRightOptions(e.target.value as ListRightOption);
              }}
            >
              <Radio value="icon">Icon</Radio>
              <Radio value="empty">Empty</Radio>
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
