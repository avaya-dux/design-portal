import {
  Button,
  Select,
  SelectOption,
  TextInput,
  Tooltip,
  TooltipCSSPosition,
  TooltipPosition,
  TooltipProps,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

const sandbox =
  "https://codesandbox.io/s/neo-react-tooltip-v43d4k?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tooltip";

const defaultLabel = "Example text inside of a tooltip that wraps a button";
const posiblePositions: TooltipPosition[] = [
  "auto",
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

export const PlaygroundImplementation = () => {
  const [label, setLabel] = useState<TooltipProps["label"]>(defaultLabel);
  const [position, setPosition] = useState<TooltipProps["position"]>("auto");

  const react = useMemo(
    () =>
      prettyPrintReact(`
<Tooltip label="${label}" position="${position}">
  <Button>Hover me to see a tooltip</Button>
</Tooltip>`),
    [label, position]
  );

  const html = useMemo(() => {
    const cssPosition = translatePositionToCSSName(position || "auto");
    const positionClass = `neo-tooltip--${cssPosition}`;

    return prettyPrintHtml(`
<div class="neo-tooltip ${positionClass} neo-tooltip--onhover">
  <button
    aria-describedby="tooltip-div-id"
    class="neo-btn neo-btn--default neo-btn-primary neo-btn-primary--default"
  >
    Hover me to see a tooltip
  </button>

  <div
    id="tooltip-div-id"
    role="tooltip"
    class="neo-tooltip__content neo-tooltip__content--multiline"
  >
    <div class="neo-arrow"></div>
    ${label}
  </div>
</div>
  `);
  }, [position, label]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Position">
            <Select
              aria-label="Position"
              value={position}
              onChange={(value) =>
                setPosition(value as TooltipProps["position"])
              }
            >
              {posiblePositions.map((value) => (
                <SelectOption key={value} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Label">
            <TextInput
              aria-label="Label"
              defaultValue={label}
              onChange={(e) => setLabel(e.target.value || defaultLabel)}
            />
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
      <Tooltip label={label} position={position}>
        <Button>Hover me to see a tooltip</Button>
      </Tooltip>
    </Playground>
  );
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
