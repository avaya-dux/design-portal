import {
  Button,
  Radio,
  RadioGroup,
  Tooltip,
  TooltipPosition,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { upperCaseFirstLetter, translatePositionToCSSName } from "./helpers";

const sandbox =
  "https://codesandbox.io/s/neo-react-tooltip-v43d4k?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tooltip";

const label =
  "Tooltip text provides additional information about the attached UI element.";
const possiblePositions: TooltipPosition[] = ["top", "bottom", "left", "right"];

type TypeOption = "default" | "multiline";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("default");
  const [position, setPosition] = useState<TooltipPosition>("top");

  const tooltipStyle = useMemo(() => {
    if (typeOption === "multiline" && ["left", "right"].includes(position)) {
      return { width: "200px" };
    }

    return undefined;
  }, [position, typeOption]);

  const react = useMemo(
    () =>
      prettyPrintReact(`
<Tooltip
  label="${label}"
  position="${position}"
  multiline={${typeOption === "multiline"}}
>
  <Button>Hover me to see a tooltip</Button>
</Tooltip>`),
    [position, typeOption]
  );

  const html = useMemo(() => {
    const cssPositionClassName = translatePositionToCSSName(position);

    return prettyPrintHtml(`
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
  `);
  }, [position, typeOption]);

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
              groupName="position-placement"
              selected={position}
              onChange={(e) => setPosition(e.target.value as TooltipPosition)}
            >
              {possiblePositions.map((value) => (
                <Radio key={value} value={value}>
                  {upperCaseFirstLetter(value)}
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
        position={position}
        multiline={typeOption === "multiline"}
        tooltipDivProps={{ style: tooltipStyle }}
      >
        <Button>Hover me to see a tooltip</Button>
      </Tooltip>
    </Playground>
  );
};
