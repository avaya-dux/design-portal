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

type ListRightOption = "button" | "no-button";

export const PlaygroundImplementation = () => {
  const [listType, setListType] = useState<ListTypeOption>("item");

  const [leftOptions, setLeftOptions] = useState<ListLeftOption>("icon");

  const [rightOptions, setRightOptions] = useState<ListRightOption>("button");

  const [listItemComponent, listItemReact, listItemHTML] = useMemo(() => {
    const element = (
      <List itemType="ListItem">
        <ListItem
          actions={
            rightOptions === "button" && [
              <IconButton
                aria-label="add call"
                data-testid="neo-button-add-call"
                icon="call-add"
                id="btn-add-call"
                shape="circle"
                variant="tertiary"
              />,
            ]
          }
          icon={
            leftOptions === "icon" && (
              <Icon aria-label="star-icon" icon="star" />
            )
          }
        >
          Aman Kharti
        </ListItem>

        <ListItem
          actions={
            rightOptions === "button" && [
              <IconButton
                aria-label="add call"
                data-testid="neo-button-add-call"
                icon="call-add"
                id="btn-add-call"
                shape="circle"
                variant="tertiary"
              />,
            ]
          }
          icon={
            leftOptions === "icon" && (
              <Icon aria-label="star-icon" icon="star" />
            )
          }
        >
          Aman Kharti
        </ListItem>
      </List>
    );

    return [
      element,
      "one",
      "two"
    ];
  }, [rightOptions, leftOptions]);

  const [listSectionComponent, listSectionReact, listSectionHTML] =
    useMemo(() => {
      const element = (
        <List itemType="ListSection">
          <ListSection
            actions={
              rightOptions === "button" && [
                <IconButton
                  aria-label="add call"
                  data-testid="neo-button-add-call"
                  icon="call-add"
                  id="btn-add-call"
                  shape="circle"
                  variant="tertiary"
                />,
              ]
            }
            icon={
              leftOptions === "icon" && (
                <Icon aria-label="star-icon" icon="star" />
              )
            }
          >
            Aman Kharti
          </ListSection>

          <ListSection
            actions={
              rightOptions === "button" && [
                <IconButton
                  aria-label="add call"
                  data-testid="neo-button-add-call"
                  icon="call-add"
                  id="btn-add-call"
                  shape="circle"
                  variant="tertiary"
                />,
              ]
            }
            icon={
              leftOptions === "icon" && (
                <Icon aria-label="star-icon" icon="star" />
              )
            }
          >
            Aman Kharti
          </ListSection>
        </List>
      );

      return [
        element,
        "one",
        "two"
        // prettyPrintReactElementToString(element),
        // prettyPrintReactElementToHtml(element),
      ];
    }, [rightOptions, leftOptions]);

  const [elementToRender, setElementToRender] = useState(
    listType === "item" ? listItemComponent : listSectionComponent,
  );

  const [react, setReact] = useState(
    listType === "item" ? listItemReact : listSectionReact,
  );

  const [html, setHTML] = useState(
    listType === "item" ? listItemHTML : listSectionHTML,
  );

  useEffect(() => {

    const component =
      listType === "item" ? listItemComponent : listSectionComponent;

    const reactToRender =
      listType === "item" ? listItemReact : listSectionReact;

    const htmlToRender = listType === "item" ? listItemHTML : listSectionHTML;

    setElementToRender(component);
    setReact(reactToRender);
    setHTML(htmlToRender);
  }, [listType, rightOptions, leftOptions]);

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
                console.log(e.target.value)
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
      {elementToRender}
    </Playground>
  );
};
