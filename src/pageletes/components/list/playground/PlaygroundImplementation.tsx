import {
  List,
  ListItem,
  ListSection,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from "@avaya/neo-react";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { Playground } from "components";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips";

type ListTypeOption = "item" | "section";

type ListLeftOption = "icon" | "no-icon";

type ListRightOption = "icon" | "empty" | "button";

export const PlaygroundImplementation = () => {
  const [listType, setListType] = useState<ListTypeOption>("item");

  const [leftOptions, setLeftOptions] = useState<ListLeftOption>("icon");

  const [rightOptions, setRightOptions] = useState<ListRightOption>("icon");

  const [component, react, html] = useMemo(() => {
    const element = listType === "item" ? (
      <List itemType="ListItem">
  <ListItem
    actions={[
      <IconButton aria-label="call" data-testid="neo-button-call" icon="call" id="btn-call" shape="circle" variant="tertiary"/>
    ]}
    icon={<Icon aria-label="star icon" icon="star" id="icon-star" role="img"/>}
  >
    Joan Barnett
  </ListItem>
  <ListItem
    actions={[
      <IconButton aria-label="call" data-testid="neo-button-call" icon="call" id="btn-call" shape="circle" variant="tertiary"/>
    ]}
    icon={<Icon aria-label="star icon" icon="star" id="icon-star" role="img"/>}
  >
    Joan Barnett
  </ListItem>
  <ListItem
    actions={[
      <IconButton aria-label="call" data-testid="neo-button-call" icon="call" id="btn-call" shape="circle" variant="tertiary"/>
    ]}
    icon={<Icon aria-label="star icon" icon="star" id="icon-star" role="img"/>}
  >
    Joan Barnett
  </ListItem>
  <ListItem
    actions={[
      <IconButton aria-label="call" data-testid="neo-button-call" icon="call" id="btn-call" shape="circle" variant="tertiary"/>
    ]}
    icon={<Icon aria-label="star icon" icon="star" id="icon-star" role="img"/>}
  >
    Joan Barnett
  </ListItem>
  <ListItem
    actions={[
      <IconButton aria-label="call" data-testid="neo-button-call" icon="call" id="btn-call" shape="circle" variant="tertiary"/>
    ]}
    icon={<Icon aria-label="star icon" icon="star" id="icon-star" role="img"/>}
  >
    Joan Barnett
  </ListItem>
</List>
    ) : ();

    return [
      element,
      prettyPrintReactElementToString(element, { filterProps: ["onClose"] }),
      prettyPrintReactElementToHtml(element),
    ];
  }, [chipType, chipVariant, chipVariable, disabled]);

  const [elementToRender, setElementToRender] = useState(component);

  useEffect(() => {
    setElementToRender(component);
  }, [chipType, chipVariant, chipVariable, disabled, component]);

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
                setLeftOptions(e.target.value as ListLeftOption);
              }}
            >
              <Radio value="default">None</Radio>
              <Radio value="icon">Icon</Radio>
              <Radio value="avatar">Avatar</Radio>
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
      {elementToRender}
    </Playground>
  );
};
