import {
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  TooltipCSSPosition,
  TooltipPosition,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";
import clsx from "clsx";

const sandbox =
  "https://codesandbox.io/s/neo-react-tooltip-v43d4k?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tooltip";

const label =
  "Tooltip text provides additional information about the attached UI element.";
const posiblePlacements: TooltipPlacement[] = [
  "auto",
  "top",
  "bottom",
  "left",
  "right",
];
const possibleOffsets: TooltipOffset[] = ["none", "left", "right"];

type TypeOption = "default" | "multiline";
type TooltipPlacement = "auto" | "top" | "bottom" | "left" | "right";
type TooltipOffset = "none" | "left" | "right";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("default");
  const [placement, setPlacement] = useState<TooltipPlacement>("auto");
  const [offset, setOffset] = useState<TooltipOffset>("none");

  const [reactPosition, cssPositionClassName] = useMemo(
    () => convertToPosition(placement, offset),
    [placement, offset]
  );

  const react = useMemo(
    () =>
      prettyPrintReact(`
<Tooltip
  label="${label}"
  position="${reactPosition}"
  multiline={${typeOption === "multiline"}}
>
  <Button>Hover me to see a tooltip</Button>
</Tooltip>`),
    [reactPosition, typeOption]
  );

  const html = useMemo(
    () =>
      prettyPrintHtml(`
<div class="neo-tooltip ${cssPositionClassName} neo-tooltip--onhover">
  <button
    aria-describedby="tooltip-div-id"
    class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
  >
    Hover me to see a tooltip
  </button>

  <div
    id="tooltip-div-id"
    role="tooltip"
    class="${clsx(
      "neo-tooltip__content",
      typeOption === "multiline" && "neo-tooltip__content--multiline"
    )}"
  >
    <div class="neo-arrow"></div>
    ${label}
  </div>
</div>
  `),
    [cssPositionClassName, typeOption]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type-options"
              selected={typeOption}
              onChange={(e) => {
                setTypeOption(e.target.value as TypeOption);
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="multiline">Multiline Tooltip</Radio>
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Position Placement">
            <RadioGroup
              groupName="position-lacement"
              selected={placement}
              onChange={(e) => {
                const value = e.target.value as TooltipPlacement;

                if (shouldDisableOffset(value)) {
                  setOffset("none");
                }

                setPlacement(value);
              }}
            >
              {posiblePlacements.map((value) => (
                <Radio key={value} value={value}>
                  {value}
                </Radio>
              ))}
            </RadioGroup>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Position Offset">
            <RadioGroup
              groupName="position-offset"
              selected={offset}
              disabled={shouldDisableOffset(placement)}
              onChange={(e) => setOffset(e.target.value as TooltipOffset)}
            >
              {possibleOffsets.map((value) => (
                <Radio key={value} value={value}>
                  {value}
                </Radio>
              ))}
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
      <Tooltip
        label={label}
        position={reactPosition}
        multiline={typeOption === "multiline"}
      >
        <Button>Hover me to see a tooltip</Button>
      </Tooltip>
    </Playground>
  );
};

// TODO: move to helpers and write tests

const shouldDisableOffset = (placement: TooltipPlacement) =>
  placement === "left" || placement === "right" || placement === "auto";

const convertToPosition = (
  direction: TooltipPlacement,
  offset: TooltipOffset
): [TooltipPosition, string] => {
  let position: TooltipPosition = "auto";
  if (direction === "left") {
    position = "left";
  } else if (direction === "right") {
    position = "right";
  } else if (direction === "top") {
    position = "top";
    if (offset === "left") {
      position = "top-left";
    } else if (offset === "right") {
      position = "top-right";
    }
  } else if (direction === "bottom") {
    position = "bottom";
    if (offset === "left") {
      position = "bottom-left";
    } else if (offset === "right") {
      position = "bottom-right";
    }
  }

  const cssPosition = translatePositionToCSSName(position);
  const positionClass = `neo-tooltip--${cssPosition}`;

  return [position, positionClass];
};

// (mostly) copy-pasted from Tooltip/helpers.ts
const translatePositionToCSSName = (
  passedPosition: TooltipPosition
): TooltipCSSPosition => {
  switch (passedPosition) {
    case "left":
      return "left";
    case "right":
      return "right";
    case "bottom":
      return "down";
    case "top":
    case "auto":
      return "up";
    case "top-left":
      return "up-left";
    case "top-right":
      return "up-right";
    case "bottom-left":
      return "down-left";
    case "bottom-right":
      return "down-right";

    default:
      console.error(
        `Unexpected position encountered: ${passedPosition}. Defaulting to default "position='up'"`
      );
      return "up";
  }
};
